import fetchNotes from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetails from "./Notes.client";


type SlugProps = {
    params: Promise<{ slug: string[] }>;
}

export default async function DocsPage({ params }: SlugProps) {
    const queryClient = new QueryClient();

    const { slug } = await params;
    const tag = slug[0] === "All" ? undefined : slug[0];
    
    const searchWord = "";
    const page = 1;

    await queryClient.prefetchQuery({
        queryKey: ["notes", searchWord, page, tag],
        queryFn: () => fetchNotes(searchWord, page, tag),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetails tag={tag} />
        </HydrationBoundary>
    )
}