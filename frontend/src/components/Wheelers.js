import React, {Component} from "react";
import ReactTable from 'react-table';

const WHEELERS = [
    {
        ID: 1,
        carID: "",
        secondName: "Павлов",
        firstName: "Сергей",
        patronymic: "Константинович",
        dateOfBirth: "24 Jun 1994",
        desc: "Сын Павлова К.И."
    },
    {
        ID: 2,
        carID: "",
        secondName: "Мартынов",
        firstName: "Константин",
        patronymic: "Васильевич",
        dateOfBirth: "16 Dec 1960",
        desc: "Опытный водитель"
    },
    {
        ID: 3,
        carID: 2,
        secondName: "Петров",
        firstName: "Валентин",
        patronymic: "Харитонович",
        dateOfBirth: "1 Feb 1973",
        desc: ""
    },
    {
        ID: 4,
        carID: "",
        secondName: "Иванов",
        firstName: "Александр",
        patronymic: "Сергеевич",
        dateOfBirth: "28 Feb 1988",
        desc: "Уволняется с 19.08.2018"
    },
    {
        ID: 5,
        carID: "",
        secondName: "Сидоров",
        firstName: "Алексей",
        patronymic: "Каримович",
        dateOfBirth: "1 May 1952",
        desc: "Делает сложный ремонт"
    },
    {
        ID: 6,
        carID: 1,
        secondName: "Валиуллин",
        firstName: "Марат",
        patronymic: "Русланович",
        dateOfBirth: "3 Mar 1992",
        desc: ""
    },
    {
        ID: 7,
        carID: 2,
        secondName: "Белкина",
        firstName: "Юлия",
        patronymic: "Виталевна",
        dateOfBirth: "9 Mar 1989",
        desc: "Имеет навыки фельдшера"
    },
];

const WHEELERS_COLUMNS = [
    {
        Header: 'Фамилия',
        accessor: 'secondName'
    },
    {
        Header: 'Имя',
        accessor: 'firstName'
    },
    {
        Header: 'Отчество',
        accessor: 'patronymic'
    },
    {
        Header: 'Год рождения',
        accessor: 'dateOfBirth'
    },
    {
        Header: 'Примечание',
        accessor: 'desc'
    }
];

class Wheelers extends Component {
    render() {
        return (
            <ReactTable
                data={WHEELERS}
                columns={WHEELERS_COLUMNS}
            />);
    }
}

export default Wheelers;