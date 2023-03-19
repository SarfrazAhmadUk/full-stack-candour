<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //
    public function index(Request $request)
    {
        $commentQuery = Comment::query();

        if (!empty($request->search)) {
            $commentQuery->where('name', 'LIKE', '%' . $request->search . '%');
        }

        if (!empty($request->sort)) {
            $sortParams = explode(':', $request->sort);
            $commentQuery->orderBy($sortParams[0], $sortParams[1] ?? 'ASC');
        }

        $comments = $commentQuery->get();

        return CommentResource::collection($comments);
    }

    public function approve(Comment $comment)
    {
        if ($comment->approved) {
            return new CommentResource($comment);
        }
        $comment->approved = 1;
        $comment->update();
        return new CommentResource($comment);
    }
}
