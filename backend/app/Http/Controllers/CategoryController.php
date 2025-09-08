<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryEditResource;
use App\Http\Resources\CategoryListResource;
use App\Manager\ImageUploadManager;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = (new Category())->getAllCategories($request->all());
        return CategoryListResource::collection($categories);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $category = $request->except('image');
        $category['slug'] = Str::slug($request->input('slug'));
        $category['user_id'] = auth()->id();
        if ($request->has('image')) {
            $file = $request->input('image');
            $category['image'] = $this->processImageUpload($file,$category['slug']);
        }

        (new Category())->storeCategory($category);
        return response()->json(['msg' => 'Category Created Successfully!', 'cls' => 'success']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return new CategoryEditResource($category);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category_data = $request->except('image');
        $category_data['slug'] = Str::slug($request->input('slug'));
        if ($request->has('image')) {
            $category_data['image'] = $this->processImageUpload($request->input('image'),$category_data['slug'],$category->photo);
        }

        $category->update($category_data);
        return response()->json(['msg' => 'Category Updated Successfully!', 'cls' => 'success']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if (!empty($category->image)) {
            ImageUploadManager::deletePhoto(Category::IMAGE_UPLOAD_PATH, $category->image);
            ImageUploadManager::deletePhoto(Category::THUMB_IMAGE_UPLOAD_PATH, $category->image);
        }

        $category->delete();
        return response()->json(['msg' => 'Category Deleted Successfully!', 'cls' => 'warning']);
    }

    private function processImageUpload(string $file, string $name, string|null $existing_photo = null)
    {
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        $path = Category::IMAGE_UPLOAD_PATH;
        $path_thumb = Category::THUMB_IMAGE_UPLOAD_PATH;

        if (!empty($existing_photo)) {
            ImageUploadManager::deletePhoto(Category::IMAGE_UPLOAD_PATH, $existing_photo);
            ImageUploadManager::deletePhoto(Category::THUMB_IMAGE_UPLOAD_PATH, $existing_photo);
        }

        $photo_name = ImageUploadManager::uploadImage($name, $width, $height, $path, $file);

        ImageUploadManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);

        return $photo_name;
    }


    // For get categories lists
    public function get_category_list(){
        $categories = (new Category())->getCategoryIdAndName();
        return response()->json($categories);
    }
}
