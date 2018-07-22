import React from 'react';
import ReactDOM from 'react-dom';
import {Button, InputGroup, InputGroupText, InputGroupAddon, Input} from 'reactstrap';
import axios from 'axios';
import ReactTable from 'react-table';
import "react-table/react-table.css";

const names = {
    secondName: "Фамилия", firstName: "Имя", patronymic: "Отчество", dateOfBirth: "Год рождения",
    desc: "Примечание"
};

const url = "/api/wheelers";

class Wheelers extends React.Component {

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
        axios.get(url)
            .then(res => {
                this.setState({
                    data: res.data._embedded.wheelers,
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
        let newElement = {};
        Object.keys(names).forEach(name => {
            newElement[name] = ReactDOM.findDOMNode(this.refs[name]).value.trim();
        });
        axios.post(url, newElement).then(responce => {
            console.log('row is Saved!');
            console.log(newElement);
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
        let id = this.row._links.wheeler.href.split("/")[5];
        let data = {};
        Object.keys(names).forEach(name => {
            data[name] = this.row[name];
        });
        console.log(data);
        axios.put(url + "/" + id, data).then(responce => {
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
        console.log(this);
        let id = this.row._links.wheeler.href.split("/")[5];
        axios.delete(url + "/" + id).then(responce => {
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
                style={{backgroundColor: "#fafafa"}}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.data];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({data});
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
                    <InputGroupText key={name + "groupText"}>{names[name]}</InputGroupText>
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
                            Header: 'Фамилия',
                            accessor: 'secondName',
                            minWidth: 100,
                            className: 'centerContent',
                            Cell: this.renderEditable
                        },
                        {
                            Header: 'Имя',
                            accessor: 'firstName',
                            minWidth: 100,
                            className: 'centerContent',
                            Cell: this.renderEditable
                        },
                        {
                            Header: 'Отчество',
                            accessor: 'patronymic',
                            minWidth: 50,
                            className: 'centerContent',
                            Cell: this.renderEditable
                        },
                        {
                            Header: 'Год рождения',
                            accessor: 'dateOfBirth',
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

export default Wheelers;