import User from '@/models/User';
import connectDB from '@/utils/connectDB';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.email) {
      return NextResponse.json(
        { status: 'failed', message: 'you are not logged in!' },
        { status: 401 },
      );
    }

    const { id: todoId } = await context.params;

    if (!todoId) {
      return NextResponse.json(
        { status: 'failed', message: 'Todo ID is required' },
        { status: 422 },
      );
    }

    const userWithTodo = await User.findOne(
      { email: token.email, 'todos._id': todoId },
      { 'todos.$': 1 },
    );

    if (!userWithTodo || !userWithTodo.todos || userWithTodo.todos.length === 0) {
      return NextResponse.json(
        { status: 'failed', message: 'Todo not found!' },
        { status: 404 },
      );
    }

    const todo = userWithTodo.todos[0];

    return NextResponse.json({
      status: 'success',
      data: { todo },
    });
  } catch (err: any) {
    console.error('Error in /api/todos/[id] GET:', err);

    return NextResponse.json(
      { status: 'failed', message: 'Error while fetching todo' },
      { status: 500 },
    );
  }
}


export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.email) {
      return NextResponse.json(
        { status: 'failed', message: 'you are not logged in!' },
        { status: 401 },
      );
    }

    const { id: todoId } = await context.params;

    if (!todoId) {
      return NextResponse.json(
        { status: 'failed', message: 'Todo ID is required' },
        { status: 422 },
      );
    }

    const result = await User.updateOne(
      { email: token.email },
      { $pull: { todos: { _id: todoId } } },
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { status: 'failed', message: 'Todo not found!' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { status: 'success', message: 'Todo deleted successfully!' },
      { status: 200 },
    );
  } catch (err: any) {
    console.error('Error in /api/todos/[id] DELETE:', err);

    return NextResponse.json(
      { status: 'failed', message: 'Error while deleting todo' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.email) {
      return NextResponse.json(
        { status: 'failed', message: 'you are not logged in!' },
        { status: 401 },
      );
    }

    const { id: todoId } = await context.params;

    if (!todoId) {
      return NextResponse.json(
        { status: 'failed', message: 'Todo ID is required' },
        { status: 422 },
      );
    }

    let objectId: mongoose.Types.ObjectId;
    try {
      objectId = new mongoose.Types.ObjectId(todoId);
    } catch {
      return NextResponse.json(
        { status: 'failed', message: 'Invalid todo ID!' },
        { status: 422 },
      );
    }

    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { status: 'failed', message: 'Invalid data!' },
        { status: 422 },
      );
    }

    const result = await User.updateOne(
      { email: token.email, 'todos._id': objectId },
      {
        $set: {
          'todos.$.title': title,
          'todos.$.description': description,
        },
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { status: 'failed', message: 'Todo not found!' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { status: 'success', message: 'Todo updated successfully!' },
      { status: 200 },
    );
  } catch (err: any) {
    console.error('Error in /api/todos/[id] PATCH:', err);

    return NextResponse.json(
      { status: 'failed', message: 'Error while updating todo' },
      { status: 500 },
    );
  }
}
