export type Note = {
    id: string;
} & NoteData;

export type NoteData = {
    title: string;
    markdown: string;
    tags: Tag[];
};

export type Tag = {
    id: string;
    label: string;
};

// Verileri local'de tutarken kullanacağımız veri tipi
// Verileri veritabanlarında tutarken dizide elemanlar varsa
// genelde sadece id'lerini tutmayı tercih ederiz

export type RawNote = {
    id: string,
} & RawNoteData;

export type RawNoteData = {
    title: string;
    markdown: string;
    tagIds: string[];
};