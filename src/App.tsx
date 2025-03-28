import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CreateNote from "./components/Form/CreateNote";
import EditNote from "./components/Form/EditNote";
import { NoteData, RawNote, Tag } from "./types";
import { useLocaleStorage } from "./useLocaleStorage";
import { v4 } from "uuid";
import { useMemo } from "react";
import MainPage from "./components/MainPage";
import NoteDetail from "./components/NoteDetail";
import Layout from "./components/Layout";

function App() {
  const [notes, setNotes] = useLocaleStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocaleStorage<Tag[]>("tags", []);

  // local'den aldığımız notlarda etiket ismi yerine id geliyor
  // id lerin her birine karşılık gelen etiketleri bulucaz
  // ve objeye ekliycez (performans için memo kullandık)
  const noteWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      })),
    [notes, tags]   
  ); 

  // yeni not oluşturur
  const addNote = ({ tags, ...data }: NoteData) => {
    setNotes((prev) => {
      return [
        ...prev,
        {
          ...data, 
          id: v4(), 
          // elemanın etiketlerini dön, id'lerini diziye aktar
          tagIds: tags.map((tag) => tag.id),
        },        
      ];
    });
  };

  // yeni etiket oluştur
  const createTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  // notu sil
  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // notu düzenle
  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    // bir notu alıcaz, notu state'de tuttuğumuz dizideki halini bulucaz
    // dizideki eski versiyonu kaldırıcaz
    // yerine aldığımız yeni notu koyacağız
    const updated = notes.map((note) => 
      note.id === id 
        ? { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
        : note
    );

    setNotes(updated);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route           
          path="/" 
          element={ <MainPage availableTags={tags} notes={noteWithTags} />} 
        />

        <Route 
          path="/new" 
          element={
            <CreateNote 
              availableTags={tags} 
              createTag={createTag} 
              onSubmit={addNote} 
            />
          } 
        />

        <Route path="/:id" element={<Layout notes={noteWithTags} />}>
          <Route 
            index 
            element={<NoteDetail deleteNote={deleteNote} />} 
          />
          <Route 
            path="edit" 
            element={
               <EditNote 
                 onSubmit={updateNote} 
                 createTag={createTag} 
                 availableTags={tags} 
               />
            } 
          />
        </Route>

        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>    
    </BrowserRouter>
  );
};

export default App;
