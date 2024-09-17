import { atom } from 'jotai';
// import { unwrap } from 'jotai/utils'

export const darkModeAtom = atom(false);
export const activeScreen = atom<null | 'Desk' | 'DatabaseSelector' | 'SetupWizard'>(null);

// const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(loadNotes())

// export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

// export const selectedTabIndexAtom = atom<number | null>(null)

// export const selectedTabAtomAsync = atom(async (get) => {
//     const notes = get(notesAtom)
//     const selectedTabIndex = get(selectedTabIndexAtom)

//     if (selectedTabIndex == null || !notes) return null

//     const selectedNote = notes[selectedTabIndex]

//     const noteContent = await window.context.readNote(selectedNote.title)

//     return {
//         ...selectedNote,
//         content: noteContent
//     }
// })
  
// export const selectedTabAtom = unwrap(
//     selectedTabAtomAsync,
//     (prev) =>
//     prev ?? {
//         title: '',
//         content: ''
//     }
// )