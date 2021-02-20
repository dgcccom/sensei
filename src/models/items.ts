
export interface ITask {
    id?: number;
    desc: string;
}

export interface IDataColumn {
    colNum: number;
    header: string;
    tasks: ITask[];
}




