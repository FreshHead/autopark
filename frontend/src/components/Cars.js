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
        this.renderEditable = this.renderEditable.bind(this);

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

    createChangeButton(row) {
        row["fetchFunc"] = this.fetchData;
        return (
            <Button row={row} block
                    color="primary" onClick={this.handleChange}>Сохранить
            </Button>);
    }

    handleChange(e) {
        e.preventDefault();
        // TODO: get id with more reasonable way
        let id = this.row._links.car.href.split("/")[5];
        let data = {};
        Object.keys(names).forEach(name => {
            data[name] = this.row[name];
        });
        console.log(data);
        axios.put('/api/cars/' + id, data).then(responce => {
            console.log('row is added');
            console.log(this);
            this.row["fetchFunc"]();
        }, failure => {
            console.log(failure);
        });
    }

    createDeleteButton(row) {
        row["fetchFunc"] = this.fetchData;
        return (
            <Button row={row} block
                    color="danger" onClick={this.handleDelete}>Удалить
            </Button>);
    }

    handleDelete(e) {
        e.preventDefault();
        // TODO: get id with more reasonable way
        let id = this.row._links.car.href.split("/")[5];
        axios.delete('/api/cars/' + id).then(responce => {
            console.log('row is deleted');
            console.log(this);
            this.row["fetchFunc"]();
        }, failure => {
            console.log(failure);
        });
    }
    renderEditable(cellInfo) {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.data];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
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
                    <Button color="success" block onClick={this.handleSubmit}>Добавить</Button>
                </form>
                <ReactTable
                    data={this.state.data}
                    columns={[
                        {
                            Header: 'Модель',
                            accessor: 'model',
                            minWidth: 100,
                            className: 'centerContent',
                            Cell: this.renderEditable
                        },
                        {
                            Header: 'Номер машины',
                            accessor: 'carNumber',
                            minWidth: 100,
                            className: 'centerContent',
                            Cell: this.renderEditable
                        },
                        {
                            Header: 'Регион',
                            accessor: 'region',
                            minWidth: 50,
                            className: 'centerContent',
                            Cell: this.renderEditable
                        },
                        {
                            Header: 'Год выпуска',
                            accessor: 'manufactureYear',
                            minWidth: 50,
                            className: 'centerContent',
                            Cell: this.renderEditable
                        },
                        {
                            Header: 'Примечание',
                            accessor: 'desc',
                            Cell: this.renderEditable
                        },
                        {
                            accessor: () => 'x', // this value is not important
                            id: "_change",
                            className: 'toRight',
                            maxWidth: 150,
                            Cell: ci => {
                                return this.createChangeButton.bind(this)(ci.original)
                            }
                        },
                        {
                            accessor: () => 'y', // this value is not important
                            id: "_deletion",
                            className: 'toRight',
                            maxWidth: 150,
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