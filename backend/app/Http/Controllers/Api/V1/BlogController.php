<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogCategoryResource;
use App\Http\Resources\BlogPostCardResource;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class BlogController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $validated = $request->validate([
            'category' => ['nullable', 'string', 'max:120'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:24'],
        ]);

        $posts = BlogPost::live()
            ->with(['category', 'featuredMedia'])
            ->when($validated['category'] ?? null, fn ($query, $slug) => $query->whereRelation('category', 'slug', $slug))
            ->latest('published_at')
            ->paginate($validated['per_page'] ?? 9)
            ->withQueryString();

        return BlogPostCardResource::collection($posts);
    }

    public function categories(): AnonymousResourceCollection
    {
        return BlogCategoryResource::collection(
            BlogCategory::query()
                ->whereHas('posts', fn ($query) => $query->live())
                ->orderBy('sort_order')
                ->get()
        );
    }

    public function show(string $slug): BlogPostResource
    {
        $post = BlogPost::live()
            ->where('slug', $slug)
            ->with(['category', 'featuredMedia', 'seo.ogImage'])
            ->firstOrFail();

        $post->setRelation('related', BlogPost::live()
            ->with(['category', 'featuredMedia'])
            ->whereKeyNot($post->getKey())
            ->orderByRaw('blog_category_id = ? desc', [$post->blog_category_id])
            ->latest('published_at')
            ->limit(3)
            ->get());

        return new BlogPostResource($post);
    }
}
