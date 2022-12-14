import React, { Component } from 'react';
import { Card, CardText, CardImg, Input, Button, Modal, ModalHeader, ModalBody, Label, Form, FormGroup, FormFeedback, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import { STAFFS } from '../shared/staff'
import './style.css'
 
export const newStaff = {
    name: '',
    doB: '',
    salaryScale: 1,
    startDate: '',
    department: null,
    annualLeave: 0,
    overTime: 0,
    salary: null,
    image: '/assets/images/alberto.png',
}

class StaffList extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            isModalOpen: false,
            isSubmitted: false,
            name: '',
            doB: '',
            salaryScale: 1,
            startDate: '',
            department: '',
            annualLeave: 0,
            overTime: 0,
            staffs: STAFFS,
            touched: {
                name: false,
                doB: false,
                startDate: false
            }               
        }
        this.handleInputSearch = this.handleInputSearch.bind(this)
        this.renderSearch = this.renderSearch.bind(this)
        this.toggleIsSubmitted = this.toggleIsSubmitted.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    toggleIsSubmitted () {
        this.setState({ isSubmitted: !this.state.isSubmitted})
    }

    toggleModal() {
        this.setState({ isModalOpen: !this.state.isModalOpen})
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: {...this.state.touched, [field]: true } 
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    validate(name, doB, startDate) {
        const errors = {
            name: '',
            doB: '',
            startDate: '',
        };
        if(this.state.touched.name && name === '') {
            errors.name = 'Y??u c???u nh???p' 
        }
        if (this.state.touched.name && name.length < 2){
            errors.name = 'Y??u c???u nhi???u h??n 2 k?? t???';
        }
        if (this.state.touched.name && name.length > 30){
            errors.name = 'Y??u c??u ??t h??n 30 k?? t???'
        }
        if(this.state.touched.startDate && startDate === ''){
            errors.startDate = 'Y??u c???u nh???p' 
        }
        if (this.state.touched.doB && doB === ''){
            errors.doB = 'Y??u c???u nh???p' 
        }
        if(this.state.isSubmitted && name === '' && doB === '' && startDate === ''){
            errors.name = 'Y??u c???u nh???p'
            errors.doB = 'Y??u c???u nh???p'
            errors.startDate = 'Y??u c???u nh???p'
        }
        return errors;
    }

    handleSubmit(event) {

        newStaff.id = this.state.staffs.length 
        newStaff.name = this.state.name
        newStaff.doB = this.state.doB
        newStaff.salaryScale = this.state.salaryScale
        newStaff.startDate = this.state.startDate
        newStaff.department = this.state.department
        newStaff.annualLeave = Number(this.state.annualLeave)
        newStaff.overTime = Number(this.state.overTime)
        newStaff.salary = Math.trunc(this.state.salaryScale * 3000000 + this.state.overTime * 200000)
        
        console.log(newStaff)
        const errors = this.validate(this.state.name, this.state.doB, this.state.startDate)
        console.log(errors)
        if (this.state.name === '' || this.state.doB === '' || this.state.startDate === ''){
            this.toggleIsSubmitted()
            event.preventDefault()
            return false
        }
        
        this.state.staffs.push(newStaff)

        localStorage.setItem('newStaff', JSON.stringify(this.state.staffs))
        this.toggleIsSubmitted()
        this.toggleModal()
        event.preventDefault()
    }

    handleInputSearch() {
        this.setState({ 
            search: this.search.value
            })
    }


    renderSearch(staffs) {
        const listStaffsSearch = staffs.filter(staff => staff.name.toLowerCase().includes(this.state.search))
        return listStaffsSearch.map(staff =>{
            return (
                <div key={staff.id} className="col-lg-2 col-md-4 col-6 mt-3 mb-3">
                    <Card>
                        <Link to={`/staffs/${staff.id}`} className="link-item">
                            <CardImg width="100%" src={staff.image} alt={staff.name} />
                            <CardText className="text-center">{staff.name}</CardText>
                        </Link>
                    </Card>
                </div>
            )
        })
    }

    render() {
        const errors = this.validate(this.state.name, this.state.doB, this.state.startDate)

        const listStaffs = this.props.staffs.map(staff =>{
            return (
                <div key={staff.id} className="col-lg-2 col-md-4 col-6 mt-3 mb-3">
                    <Card>
                        <Link to={`/staffs/${staff.id}`} className="link-item">
                            <CardImg width="100%" src={staff.image} alt={staff.name} />
                            <CardText className="text-center">{staff.name}</CardText>
                        </Link>
                    </Card>
                </div>
            )
        })

        const localStorageStaff = (JSON.parse(localStorage.getItem('newStaff')) ? JSON.parse(localStorage.getItem('newStaff')) : [])
        const renderLocalStorageStaff = localStorageStaff.map(staff =>{
                return (
                    <div key={staff.id} className="col-lg-2 col-md-4 col-6 mt-3 mb-3">
                        <Card>
                            <Link to={`/staffs/${staff.id}`} className="link-item">
                                <CardImg width="100%" src={staff.image} alt={staff.name} />
                                <CardText className="text-center">{staff.name}</CardText>
                            </Link>
                        </Card>
                    </div>
                )
        })

        const renderStaffs = this.state.search ? this.renderSearch(this.props.staffs) : listStaffs
        const renderNewStaff = this.state.search ? this.renderSearch(localStorageStaff) : renderLocalStorageStaff
        return (
            <div className="container bg-custom">
                <div className="row pt-2">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <h3>Menu</h3>
                            </div>
                            <div className="col-12 col-md-2">
                                <Button onClick={this.toggleModal} color="dark">
                                    <i className="fa fa-plus" aria-hidden="true"></i>
                                </Button>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="row">
                                    <div className="col-9 col-md-8">
                                        <Input type="text" width="30%" id="search" name="search" 
                                        placeholder="Nh???p t??n nh??n vi??n" 
                                        innerRef={(input) => this.search = input} />
                                    </div>
                                    <div className="col-3 col-md-4">
                                        <Button color="primary" type="submit" onClick={this.handleInputSearch}>T??m</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {localStorageStaff.length === 0 ? renderStaffs : renderNewStaff}
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    Th??m nh??n vi??n
                </ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit} className="p-3">
                        <FormGroup row>
                            <Label htmlFor="name" md={5}>T??n</Label>
                            <Col md={7}>
                                <Input name="name" 
                                placeholder="Nh???p t??n" 
                                id="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                onBlur={this.handleBlur('name')}
                                valid={errors.name === ''}
                                invalid={errors.name !== ''} />
                            <FormFeedback>{errors.name}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="doB" md={5}>Ng??y sinh</Label>
                            <Col md={7}>
                                <Input type="date" name="doB" placeholder="Nh???p ng??y sinh" id="doB"
                                    value={this.state.doB}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleBlur('doB')}
                                    valid={errors.doB === ''}
                                    invalid={errors.doB !== ''} />
                                <FormFeedback>{errors.doB}</FormFeedback>
                                
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="startDate" md={5}>Ng??y v??o c??ng ty</Label>
                            <Col md={7}>
                                <Input type="date" name="startDate" placeholder="Nh???p ng??y v??o c??ng ty" id="startDate"
                                    value={this.state.startDate}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleBlur('startDate')}
                                    valid={errors.startDate === ''}
                                    invalid={errors.startDate !== ''} />
                                <FormFeedback>{errors.startDate}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="department" md={5}>Ph??ng ban</Label>
                            <Col md={7}>
                                <Input type="select" name="department" id="department"
                                        value={this.state.department}
                                        onChange={this.handleInputChange}>
                                    <option>Sale</option>
                                    <option>HR</option>
                                    <option>Marketing</option>
                                    <option>IT</option>
                                    <option>Finance</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="salaryScale" md={5}>H??? s??? l????ng</Label>
                            <Col md={7}>
                                <Input type="text" name="salaryScale" placeholder="Nh???p h??? s??? l????ng" id="salaryScale"
                                    value={this.state.salaryScale}
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="annualLeave" md={5}>S??? ng??y ngh??? c??n l???i</Label>
                            <Col md={7}>
                                <Input type="text" name="annualLeave" placeholder="Nh???p s??? ng??y ngh??? c??n l???i" id="annualLeave"
                                    value={this.state.annualLeave}
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="overTime" md={5}>S??? ng??y ???? l??m th??m</Label>
                            <Col md={7}>
                                <Input type="text" name="overTime" placeholder="Nh???p s??? ng??y ???? l??m th??m" id="overTime"
                                    value={this.state.overTime}
                                    onChange={this.handleInputChange}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size: 10, offset: 2}}>
                                <Button type="submit" color="primary">Th??m</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
            </div>
        )
    } 
}

export default StaffList;