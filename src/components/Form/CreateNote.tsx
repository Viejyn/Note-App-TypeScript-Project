import { NoteData, Tag } from "../../types";
import NoteForm from "./NoteForm";

export type CreateNoteProps = {
    onSubmit: (data: NoteData) => void;
    createTag: (tag: Tag) => void;
    availableTags: Tag[];
} & Partial<NoteData>;
// Partial sayesinde; farklı bir type'ın bütün değerlerini
// bu "CreateNoteProps" type'ına aktardık. Aynı zamanda partial
// kullandığımız için hepsi ? ile tanımlanmış gibi bazı
// durumlarda undefined olabilir

const CreateNote = ({ availableTags, onSubmit, createTag }:CreateNoteProps) => {
    return (
        <div className="container py-5">
            <h1>Yeni Not Oluştur</h1>
            <NoteForm 
              availableTags={availableTags} 
              createTag={createTag} 
              onSubmit={onSubmit} 
            />
        </div>
    );
};

export default CreateNote;