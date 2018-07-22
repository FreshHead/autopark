import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import axios from 'axios';
import ReactTable from 'react-table';
import "react-table/react-table.css";


const CAR_COLUMNS = [
    {
        Header: 'Модель',
        accessor: 'model',
        maxWidth: 250,
        className: 'centerContent'
    },
    {
        Header: 'Номер машины',
        accessor: 'carNumber',
        maxWidth: 150,
        className: 'centerContent'
    },
    {
        Header: 'Регион',
        accessor: 'region',
        maxWidth: 100,
        className: 'centerContent'
    },
    {
        Header: 'Год выпуска',
        accessor: 'manufactureYear',
        maxWidth: 200,
        className: 'centerContent'
    },
    {
        Header: 'Примечание',
        accessor: 'desc',
    }
];

const root = '/api';
const names = ['model', 'carNumber', 'region', 'manufactureYear', 'desc'];

class Cars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {cars: []};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/api/cars').then(response => {
            this.setState({cars: response.data._embedded.cars});
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let newCar = {};
        names.forEach(name => {
            newCar[name] = ReactDOM.findDOMNode(this.refs[name]).value.trim();
        });

        const instance = axios.create({
            headers: {"accepts":"application/json"}
        });
        instance.post('api/cars', newCar).then(response => {
            console.log('data is Saved!')
        });
        // let xhr = new XMLHttpRequest();
        // xhr.open('POST', 'http://localhost:8080/api/cars', true);
        //
        // xhr.onload = function() {
        //     alert('Ошибка' + this.responseText);
        // };
        // xhr.send(newCar);
        // fetch()
        // axios.post('api/cars', newCar).then(responce => {
        //     console.log('data is Saved!');
        // });
        console.log(newCar);

    };


    render() {
        var inputs = names.map(name =>
            <p key={name}>
                <input type="text" placeholder={name} ref={name} className="field"/>
            </p>
        );
        return (
            <div className="centerContent">
                <form>
                    {inputs}
                    <Button color="primary" onClick={this.handleSubmit}>Сохранить</Button>
                </form>
                <ReactTable
                    data={this.state.cars}
                    columns={CAR_COLUMNS}
                />
            </div>
        );
    }
}

export default Cars;