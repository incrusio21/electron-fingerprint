import { controlMolecule, dfMolecule, inputMolecule } from "@/store";
import { useMolecule } from "bunshi/react";
import { useAtomValue } from "jotai/react";

export function useDfValue() {
    const initAtom = useMolecule(dfMolecule);
    return useAtomValue(initAtom)
}

export function useContolValue() {
    const controlAtom = useMolecule(controlMolecule);
    return useAtomValue(controlAtom);
}

export function useIntelValue() {
    const controlAtom = useMolecule(inputMolecule);
    return useAtomValue(controlAtom);
}