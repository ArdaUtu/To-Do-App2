import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

export type Task = string;
export type Tasks = Task[];
export type InputChangeEvent = ChangeEvent<HTMLInputElement>;
export type AddTaskHandler = () => void;
export type RemoveTaskHandler = (index: number) => void;

export interface InputfieldProps {
	waarde: string;
	setWaarde: Dispatch<SetStateAction<string>>;
	onEnter: AddTaskHandler;
}

export interface Listprops {
	taken: Tasks;
	onVerwijderTaak: RemoveTaskHandler;
}

export interface VoegTaakToeProps {
	onToevoegen: AddTaskHandler;
}
