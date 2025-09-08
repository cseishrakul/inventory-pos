<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use App\Http\Requests\StoreSubCategoryRequest;
use App\Http\Requests\UpdateSubCategoryRequest;
use App\Http\Resources\SubCategoryEditResource;
use App\Http\Resources\SubCategoryListResource;
use App\Manager\ImageUploadManager;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $subcategories = (new SubCategory())->getAllSubCategories($request->all());
        return SubCategoryListResource::collection($subcategories);
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
    public function store(StoreSubCategoryRequest $request)
    {
         $sub_category = $request->except('image');
        $sub_category['slug'] = Str::slug($request->input('slug'));
        $sub_category['user_id'] = auth()->id();
        if ($request->has('image')) {
            $file = $request->input('image');
            $sub_category['image'] = $this->processImageUpload($file,$sub_category['slug']);
        }

        (new SubCategory())->storeSubCategory($sub_category);
        return response()->json(['msg' => 'SubCategory Created Successfully!', 'cls' => 'success']);
    }

    /**
     * Display the specified resource.
     */
    public function show(SubCategory $subCategory)
    {
        return new SubCategoryEditResource($subCategory);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubCategory $subCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubCategoryRequest $request, SubCategory $subCategory)
    {
        $sub_category_data = $request->except('image');
        $sub_category_data['slug'] = Str::slug($request->input('slug'));
        if ($request->has('image')) {
            $sub_category_data['image'] = $this->processImageUpload($request->input('image'),$sub_category_data['slug'],$subCategory->photo);
        }

        $subCategory->update($sub_category_data);
        return response()->json(['msg' => 'Sub Category updated Successfully!', 'cls' => 'success']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubCategory $subCategory)
    {
        if(!empty($subCategory->image)){
            ImageUploadManager::deletePhoto(SubCategory::IMAGE_UPLOAD_PATH,$subCategory->image);
            ImageUploadManager::deletePhoto(SubCategory::THUMB_IMAGE_UPLOAD_PATH,$subCategory->image);
        }

        $subCategory->delete();
        return response()->json(['msg' => 'Sub Category Deleted Successfully!','cls' => 'warning']);
    }


    private function processImageUpload(string $file, string $name, string|null $existing_photo = null)
    {
        $width = 800;
        $height = 800;
        $width_thumb = 150;
        $height_thumb = 150;
        $path = SubCategory::IMAGE_UPLOAD_PATH;
        $path_thumb = SubCategory::THUMB_IMAGE_UPLOAD_PATH;

        if (!empty($existing_photo)) {
            ImageUploadManager::deletePhoto(SubCategory::IMAGE_UPLOAD_PATH, $existing_photo);
            ImageUploadManager::deletePhoto(SubCategory::THUMB_IMAGE_UPLOAD_PATH, $existing_photo);
        }

        $photo_name = ImageUploadManager::uploadImage($name, $width, $height, $path, $file);

        ImageUploadManager::uploadImage($name, $width_thumb, $height_thumb, $path_thumb, $file);

        return $photo_name;
    }

}
