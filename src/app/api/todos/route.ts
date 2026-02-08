import User from '@/models/User';
import type { TodoStatus } from '@/types/todo';
import connectDB from '@/utils/connectDB';
import { sortTodos } from '@/utils/sortTodos';
import mongoose from 'mongoose';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const VALID_STATUSES: TodoStatus[] = ['todo', 'inProgress', 'review', 'done'];

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.email) {
      return NextResponse.json(
        { status: 'failed', message: 'you are not logged in!' },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email: token.email });

    if (!user) {
      return NextResponse.json(
        { status: 'failed', message: 'User does not exist!' },
        { status: 404 },
      );
    }
    const sortedData = sortTodos(user.todos);

    return NextResponse.json({ status: 'success', data: { todos: sortedData } });
  } catch (err: any) {
    console.error('Error in /api/todos GET:', err);
    return NextResponse.json(
      { status: 'failed', message: 'Error while fetching todos' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.email) {
      return NextResponse.json(
        { status: 'failed', message: 'you are not logged in!' },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email: token.email });

    if (!user) {
      return NextResponse.json(
        { status: 'failed', message: 'User does not exist!' },
        { status: 404 },
      );
    }

    const body = await req.json();
    const { title, status, Description } = body;

    if (!title || !status || !Description) {
      return NextResponse.json({ status: 'failed', message: 'Invalid data!' }, { status: 422 });
    }

    user.todos.push({ title, status, Description });
    await user.save();

    return NextResponse.json({ status: 'success', message: 'Todo created!' }, { status: 201 });
  } catch (err: any) {
    console.error('Error in /api/todos POST:', err);

    const isDev = process.env.NODE_ENV !== 'production';

    return NextResponse.json(
      {
        status: 'failed',
        message: 'Error while creating todo',
        ...(isDev && { error: err?.message ?? 'Unknown error' }),
      },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.email) {
      return NextResponse.json(
        { status: 'failed', message: 'you are not logged in!' },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email: token.email });

    if (!user) {
      return NextResponse.json(
        { status: 'failed', message: 'User does not exist!' },
        { status: 404 },
      );
    }

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { status: 'failed', message: 'Invalid data!' },
        { status: 422 }
      );
    }

    if (!VALID_STATUSES.includes(status as TodoStatus)) {
      return NextResponse.json(
        { status: 'failed', message: 'Invalid status!' },
        { status: 422 }
      );
    }

    let objectId: mongoose.Types.ObjectId;
    try {
      objectId = new mongoose.Types.ObjectId(id);
    } catch {
      return NextResponse.json(
        { status: 'failed', message: 'Invalid todo ID!' },
        { status: 422 }
      );
    }

    const result = await User.updateOne(
      { email: token.email, 'todos._id': objectId },
      { $set: { 'todos.$.status': status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { status: 'failed', message: 'Todo not found!' },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: 'success', message: 'Todo updated!' }, { status: 200 });
  } catch (err: any) {
    console.error('Error in /api/todos PATCH:', err);

    const isDev = process.env.NODE_ENV !== 'production';

    return NextResponse.json(
      {
        status: 'failed',
        message: 'Error while updating todo',
        ...(isDev && { error: err?.message ?? 'Unknown error' }),
      },
      { status: 500 },
    );
  }
}