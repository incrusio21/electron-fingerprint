import { Doc } from "@fyo/models/doc";
import { Schema } from "@schemas/types";
import { evaluateHidden } from "./doc";
import { UIGroupedFields } from "./types";


export async function getSelectedFilePath() {
    return window.context.getOpenFilePath({
      title: 'Select file',
      properties: ['openFile'],
      filters: [{ name: 'SQLite DB File', extensions: ['db'] }],
    });
}

export function getFieldsGroupedByTabAndSection(
	schema: Schema,
	doc: Doc
): UIGroupedFields {
	const grouped: UIGroupedFields = new Map();
	
	for (const field of schema?.fields ?? []) {
		const tab = field.tab ?? 'Main';
		const section = field.section ?? 'Default';
		if (!grouped.has(tab)) {
			grouped.set(tab, new Map());
		}

		const tabbed = grouped.get(tab)!;
		if (!tabbed.has(section)) {
			tabbed.set(section, []);
		}
		
		if (field.meta) {
			continue;
		}

		if (evaluateHidden(field, doc)) {
			continue;
		}

		tabbed.get(section)!.push(field);
	}

	// Delete empty tabs and sections
	for (const tkey of grouped.keys()) {
		const section = grouped.get(tkey);
		if (!section) {
			grouped.delete(tkey);
			continue;
		}

		for (const skey of section.keys()) {
			const fields = section.get(skey);
			if (!fields || !fields.length) {
			  section.delete(skey);
			}
		}
	  
		if (!section?.size) {
			grouped.delete(tkey);
		}
	}

  	return grouped
}

// Safely handle ref type (MutableRefObject or callback ref)
export const handleRef = (ref: React.Ref<HTMLInputElement>) => {
	if (typeof ref === 'function') {
		return null; // Handle callback refs if needed
	} else if (ref && 'current' in ref) {
		return ref.current;
	}
	return null;
};