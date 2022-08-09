import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import StaffList from './StaffListComponent'
import Header from './HeaderComponent'
import StaffDetail from './StaffdetailComponent'
import Departments from './DepartmentComponent'
import PayRoll from './PayrollComponent'
import Footer from './FooterComponent'

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      newStaff: JSON.parse(localStorage.getItem('newStaff')) ? JSON.parse(localStorage.getItem('newStaff')) : []
    }
  }
  render() {


    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail staff={this.props.staffs.filter(staff => staff.id === parseInt(match.params.staffId,10))[0]}
          newStaff={this.state.newStaff.filter(staff => staff.id === parseInt(match.params.staffId,10))[0]}
         />
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/staffs" component={() => <StaffList staffs={this.props.staffs} newStaff={this.state.newStaff} />} />
          <Route path="/staffs/:staffId" component={StaffWithId} />
          <Route exact path="/departments" component={() => <Departments department={this.props.departments} />} />
          <Route exact path="/payroll" component={() => <PayRoll staffs={this.props.staffs} />} />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));