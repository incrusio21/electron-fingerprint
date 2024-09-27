import { Control, Input } from '@/utils/types';
import { DocValue } from '@fyo/core/types';
import { Doc } from '@fyo/models/doc';
import { Field } from '@schemas/types';
import { createScope, molecule } from 'bunshi/react';
import { atom } from 'jotai';
// import { unwrap } from 'jotai/utils'
type ControlField = Field & { 
    change: (value: DocValue) => Promise<void> 
}

export const darkModeAtom = atom(false);
export const activeScreen = atom<null | 'Desk' | 'DatabaseSelector' | 'SetupWizard'>(null);

// Define atoms
export const docAtom = atom<Doc>({} as Doc);
export const fields = atom<Field[]>([]);

// Define DF Scope
export const initialDfScope = createScope({} as ControlField)
export const dfMolecule = molecule((_, getScope) => {
    const initialDf = getScope(initialDfScope)
    return atom(initialDf)
})


// Define Control Scope
export const initialControlScope = createScope({} as Control)
export const controlMolecule = molecule((_, getScope) => {
    const initialControl = getScope(initialControlScope)
    return atom(initialControl)
})

// Define Input Scope
export const initialInpuScope = createScope({} as Input)
export const inputMolecule = molecule((_, getScope) => {
    const initialInput = getScope(initialInpuScope)
    return atom(initialInput)
})

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