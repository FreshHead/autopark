import React, {Component} from "react";
import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';

import '../index.css';

import Start from "./Start";
import Cars from "./Cars";
import Wheelers from "./Wheelers";
import Assignment from "./Assignment";

class App extends Component {
    constructor(props) {
        super(props);

        axios.defaults.baseURL = 'http://localhost:8080/';

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div>
                <header>
                    <h1 className="Header-title">Автопарк</h1>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '1'})}
                                onClick={() => {
                                    this.toggle('1');
                                }}>
                                Начало
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '2'})}
                                onClick={() => {
                                    this.toggle('2');
                                }}>
                                Парк машин
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '3'})}
                                onClick={() => {
                                    this.toggle('3');
                                }}>
                                Список водителей
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({active: this.state.activeTab === '4'})}
                                onClick={() => {
                                    this.toggle('4');
                                }}>
                                Назначение водителей
                            </NavLink>
                        </NavItem>
                    </Nav>
                </header>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Start/>
                    </TabPane>
                    <TabPane tabId="2">
                        <Cars/>
                    </TabPane>
                    <TabPane tabId="3">
                        <Wheelers/>
                    </TabPane>
                    <TabPane tabId="4">
                        <Assignment/>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default App;