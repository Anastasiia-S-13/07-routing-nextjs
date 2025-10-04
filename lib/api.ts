import axios from "axios";
import type { Note, NoteTag } from "../types/note";

interface NoteHttpResponse{
    notes: Note[];
    totalPages: number;
}

 interface CreateNotePost {
    title: string;
    content: string;
    tag: NoteTag;
}



axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";

export default async function fetchNotes(query: string, page: number): Promise<NoteHttpResponse> {
    const response = await axios.get<NoteHttpResponse>("", {
        params: {
            search: query,
            page: page,
            perPage: 12,
        },
        headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
      },
    }
    )
    return response.data;
}

export async function createNote({ title, content, tag }: CreateNotePost): Promise<Note> {
    const createResponse = await axios.post<Note>("",
        { title, content, tag },
        {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
            },
        }
    );
    return createResponse.data
}

export async function deleteNote(id: string): Promise<Note> {
    const deleteResponse = await axios.delete<Note>(`/${id}`, {
         headers: {
                accept: "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
            },
    })
    return deleteResponse.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
    const responseById = await axios.get<Note>(`/${id}`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        }
    });
    return responseById.data;
}