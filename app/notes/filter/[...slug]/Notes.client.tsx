"use client";

import { keepPreviousData, useQuery} from "@tanstack/react-query"
import css from "./page.module.css"
import SearchBox from "@/components/SearchBox/SearchBox"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"
import NoteList from "@/components/NoteList/NoteList"
import Modal from "@/components/Modal/Modal"
import NoteForm from "@/components/NoteForm/NoteForm"
import Pagination from "@/components/Pagination/Pagination"
import fetchNotes from "@/lib/api";
import toast, { Toaster } from "react-hot-toast"

export default function NoteDetails({ tag }: { tag?: string }) {
    const [inputValue, setInputValue] = useState<string>(""); 
    const [searchWord, setSearchWord] = useState<string>("");
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState(1);

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const updateSearchWord = useDebouncedCallback((value: string) => {
    setSearchWord(value);
    setPage(1);
  }, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);      
    updateSearchWord(value); 
  };


    const { data } = useQuery({
        queryKey: ['notes', searchWord, page, tag],
        queryFn: () => fetchNotes(searchWord, page, tag),
        placeholderData: keepPreviousData,
    })

    useEffect(() => {
        if (data?.notes.length === 0) {
         toast.error("Not found...")
    }
   }, [data])


    return <div className={css.app}>
        <div className={css.toolbar}>
            <SearchBox onChange={handleChange} value={inputValue}/>
            {data && data?.totalPages > 1 && <Pagination totalPages={data?.totalPages ?? 0} page={page} onPageChange={(newPage) => setPage(newPage)} />}
            <button className={css.button} onClick={handleOpenModal}>Create note +</button>
        </div>
        <Toaster/>
       {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
        {openModal && (
            <Modal onClose={handleCloseModal}>
                <NoteForm onClose={handleCloseModal}/>
            </Modal>
        )}
    </div>
};