import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface NoteHttpResponse{
    notes: Note[];
    totalPages: number;
}

 interface CreateNotePost {
    title: string;
    content: string;
    tag: NoteTag;
 }

// export type Category = {
//     id: string;
//     name: string;
//     description: string;
//     createdAt: string;
//     updatedAt: string;
// }



axios.defaults.baseURL = "https://notehub-public.goit.study/api/notes";

// export const getCategory = async () => {
//     const res = await axios.get<Category[]>("/categories");
//     return res.data;
// }

export default async function fetchNotes(query: string, page: number, tag?: NoteTag): Promise<NoteHttpResponse> {
    const response = await axios.get<NoteHttpResponse>("", {
        params: {
            search: query,
            page: page,
            perPage: 12,
            tag: tag || undefined,
        },
        headers: {
        accept: "application/json",
        Authorization: `Bearer ${myKey}`,
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
                Authorization: `Bearer ${myKey}`,
            },
        }
    );
    return createResponse.data
}

export async function deleteNote(id: string): Promise<Note> {
    const deleteResponse = await axios.delete<Note>(`/${id}`, {
         headers: {
                accept: "application/json",
                Authorization: `Bearer ${myKey}`,
            },
    })
    return deleteResponse.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
    const responseById = await axios.get<Note>(`/${id}`, {

        headers: {
            accept: "application/json",
            Authorization: `Bearer ${myKey}`,
        }
    });
    return responseById.data;
}