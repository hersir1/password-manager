export interface Log {
	version: string;
	date: Date;
	bugfix?: LogDescription[];
	features?: LogDescription[];
}

interface LogDescription {
	title: string;
	description: string;
}
