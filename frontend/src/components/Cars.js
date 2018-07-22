import React from 'react';
import ReactDOM from 'react-dom';
import {Button,  InputGroup, InputGroupText, InputGroupAddon, Input} from 'reactstrap';
import axios from 'axios';
import ReactTable from 'react-table';
import "react-table/react-table.css";

const names = { model: "Модель", carNumber: "Номер машины", region: "Регион", manufactureYear:"Год выпуска",
    desc:"Примечание" };

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
        Object.keys(names).forEach(name => {
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
        var inputs = Object.keys(names).map(name =>
            <InputGroup className="InputGroup" key={name + "group"}>
                <InputGroupAddon key={name + "groupAddon"} addonType="prepend">
                    <InputGroupText key={name + "groupText"} >{names[name]}</InputGroupText>
                </InputGroupAddon>
                {/*<p key={name}>*/}
                    <Input type="text" ref={name} className="field"/>
            {/*</p>*/}
            </InputGroup>
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
                            Header: 'Модель',
                            accessor: 'model',
                            minWidth: 100,
                            className: 'centerContent',
                        },
                        {
                            Header: 'Номер машины',
                            accessor: 'carNumber',
                            minWidth: 100,
                            className: 'centerContent'
                        },
                        {
                            Header: 'Регион',
                            accessor: 'region',
                            minWidth: 50,
                            className: 'centerContent'
                        },
                        {
                            Header: 'Год выпуска',
                            accessor: 'manufactureYear',
                            minWidth: 50,
                            className: 'centerContent'
                        },
                        {
                            Header: 'Примечание',
                            accessor: 'desc',
                        },
                        {
                            accessor: () => 'x', // this value is not important
                            id: "_deletion",
                            className: 'toRight',
                            minWidth: 100,
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