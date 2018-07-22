import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import axios from 'axios';
import ReactTable from 'react-table';
import "react-table/react-table.css";

const names = ['model', 'carNumber', 'region', 'manufactureYear', 'desc'];

class Cars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        };
        this.fetchData = this.fetchData.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    fetchData(state, instance) {
        this.setState({loading: true});
        axios.get('/api/cars')
            .then(res => {
                this.setState({
                    data: res.data._embedded.cars,
                    loading: false
                });
            }, failure => {
                console.log(failure);
            });
    }

    componentDidMount() {
        this.fetchData();
    }

    handleSubmit(e) {
        e.preventDefault();
        let newCar = {};
        names.forEach(name => {
            newCar[name] = ReactDOM.findDOMNode(this.refs[name]).value.trim();
        });
        axios.post('api/cars', newCar).then(responce => {
            console.log('row is Saved!');
            console.log(newCar);
            this.fetchData();
        }, failure => {
            console.log(failure);
        });
    };

    createDeleteButton(row) {
        row["fetchFunc"] = this.fetchData;
        return (
            <Button row={row}
                    color="danger" onClick={this.handleDelete}>Удалить
            </Button>);
    }

    handleDelete(e) {
        e.preventDefault();
        // TODO: get id with more reasonable way
        let id = this.row._links.car.href.split("/")[5];
        console.log(this);
        axios.delete('/api/cars/' + id).then(responce => {
            console.log('row is deleted');
            console.log(this);
            this.row["fetchFunc"]();
        }, failure => {
            console.log(failure);
        });
    }

    render() {
        var inputs = names.map(name =>
            <p key={name}>
                <input type="text" placeholder={name} ref={name} className="field"/>
            </p>
        );
        return (
            <div>
                <form className="centerContent">
                    {inputs}
                    <Button color="primary" onClick={this.handleSubmit}>Сохранить</Button>
                </form>
                <ReactTable
                    data={this.state.data}
                    columns={[
                        {
                            Header: "id",
                            accessor: 'id'
                        },
                        {
                            Header: 'Модель',
                            accessor: 'model',
                            maxWidth: 250,
                            className: 'centerContent',
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
                        },
                        {
                            accessor: () => 'x', // this value is not important
                            id: "_selector",
                            Header: "Delete",
                            minWidth: 300,
                            Cell: ci => {
                                return this.createDeleteButton.bind(this)(ci.original)
                            }
                        },
                    ]}
                    loading={this.state.loading} // Display the loading overlay when we need it
                    onFetchData={this.fetchData} // Request new data when things change
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default Cars;