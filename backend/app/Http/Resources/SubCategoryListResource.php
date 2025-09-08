<?php

namespace App\Http\Resources;

use App\Manager\ImageUploadManager;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubCategoryListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'category_name' => $this->category?->name,
            'slug' => $this->slug,
            'serial' => $this->serial,
            'description' => $this->description,
            'status' => $this->status == 1 ? 'Active':'Inactive',
            'photo' => ImageUploadManager::prepareImageUrl(SubCategory::THUMB_IMAGE_UPLOAD_PATH,$this->image),
            'photo_full' => ImageUploadManager::prepareImageUrl(SubCategory::IMAGE_UPLOAD_PATH,$this->image),
            'created_by' => $this->user?->name,
            'created_at' => $this->created_at->toDayDateTimeString(),
            'updated_at' => $this->created_at != $this->updated_at ? $this->updated_at->toDayDateTimeString():'Not Updated Yet',
        ];
    }
}
