import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import StaffList from './StaffListComponent'
import Header from './HeaderComponent'
import StaffDetail from './StaffdetailComponent'
import Departments from './DepartmentComponent'
import PayRoll from './PayrollComponent'
import Footer from './FooterComponent'
import { STAFFS } from '../shared/staff'
import { DEPARTMENTS } from '../shared/staff'


class Main extends Component {
constructor(props){
  super(props);

  this.state = {
    staffs: STAFFS,
    departments: DEPARTMENTS,
    newStaff: JSON.parse(localStorage.getItem('newStaff')) ? JSON.parse(localStorage.getItem('newStaff')) : []
  }
}

  render() {


    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail staff={this.state.staffs.filter(staff => staff.id === parseInt(match.params.staffId,10))[0]}
          newStaff={this.state.newStaff.filter(staff => staff.id === parseInt(match.params.staffId,10))[0]}
         />
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/staffs" component={() => <StaffList staffs={this.state.staffs} newStaff={this.state.newStaff} />} />
          <Route path="/staffs/:staffId" component={StaffWithId} />
          <Route exact path="/departments" component={() => <Departments department={this.state.departments} />} />
          <Route exact path="/payroll" component={() => <PayRoll staffs={this.state.staffs} />} />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;