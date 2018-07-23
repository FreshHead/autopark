import React, {Component} from "react";
import ReactTable from 'react-table';
import "react-table/react-table.css";

import treeTableHOC from "react-table/lib/hoc/treeTable";

import axios from 'axios';

const TreeTable = treeTableHOC(ReactTable);
const url = "/api/wheelers";

class Assignment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true
        };
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(state, instance) {
        this.setState({loading: true});
        axios.get(url)
            .then(res => {
                this.setState({
                    // TODO: Need to get car from wheeler ref
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

    render() {
        return (
            <div>
                <TreeTable
                    data={this.state.data}
                    columns={[
                        {
                            id: 'model',
                            accessor: car => car.model
                        },
                        {
                            Header: "Фамилия",
                            accessor: "secondName"
                        },
                    ]}
                />
            </div>
        )
    }
}

export default Assignment;