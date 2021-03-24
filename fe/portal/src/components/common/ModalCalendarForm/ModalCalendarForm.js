import React from 'react'
import 'moment-timezone'
import { Row, Col, Form, FormControl, Button } from 'react-bootstrap'
import { checkMobile, emailRegExp } from '../../../ultils'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const ModalCalendarForm = (props) => {
  const { appointmentTemplate, inputValues, handleChange, listGuests, handleAddGuest, handleRemoveGuest, handleChangeGuest} = props
  return (
    <>
      {
        checkMobile() ?
          <>
            <div className='body-right__label' >Your Details</div>
              <div >Name *</div>
              <FormControl required value={inputValues.name} style={{ margin: '5px 0px 15px 0px' }} id="name" placeholder='Name' onChange={handleChange} />
              <div>Email *</div>
              <Form.Group>
                <Form.Control isInvalid={inputValues.email.length > 0 ? !emailRegExp.test(inputValues.email) : true} type="email" placeholder='email@example.com' required value={inputValues.email} style={{ margin: '5px 0px 15px 0px' }} id="email" onChange={handleChange} />

                <Form.Control.Feedback type="invalid">
                  Invalid email
                </Form.Control.Feedback>
              </Form.Group>
              {
                listGuests.map((guest, index) => (
                  <div key={index} className='body-right__guest'>
                    <Row>
                      <Col xs={11} sm={11} md={11} lg={11} xxl={11}>

                      </Col>
                      <Col className='body-right__guest__btndelete' xs={1} sm={1} md={1} lg={1} xxl={1}>
                        <div onClick={() => handleRemoveGuest(guest.id)}>Delete</div>
                      </Col>
                    </Row>
                    <div>Email Guest {index + 1} *</div>
                    <Form.Group>
                      <Form.Control isInvalid={guest[`${guest.id}`] ? !emailRegExp.test(guest[`${guest.id}`]) : true} type="email" placeholder='email@example.com' required value={guest[`${guest.id}`] ? guest[`${guest.id}`] : ''} style={{ margin: '5px 0px 15px 0px' }} id={`${guest.id}`} onChange={(e) => handleChangeGuest(e, guest.id)} />

                      <Form.Control.Feedback type="invalid">
                        Invalid email
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                ))
              }
              <Button style={{ marginBottom: '30px', fontSize: '9px !important' }} variant="outline-primary" onClick={() => handleAddGuest()} >ADD GUESTS</Button>

              {
                appointmentTemplate && appointmentTemplate?.questions?.map((question, index) => (
                  <div className='body-right__question' key={index}>
                    <div >{question.label} {question.checked ? ' *' : ''}</div>
                    {
                      question && question.type === 'phone' ?
                        <div style={{ margin: '10px 0px' }}>
                          <PhoneInput
                            placeholder="Enter phone number"
                            onChange={phone => handleChange(phone, question.id)}
                            value={inputValues[question.id]}
                            inputProps={{
                              name: 'phone',
                              required: question.checked
                            }}
                          />
                        </div>
                        :
                        <FormControl required={question.checked} value={inputValues[question.id]} style={{ margin: '5px 0px 15px 0px' }} id={question.id} placeholder={question.label} onChange={handleChange} />
                    }
                  </div>
                ))
              }
          </>
          :
          <>
            <div className='body-right__label' >Your Details</div>
              <div >Name *</div>
              <Form.Control required value={inputValues.name} style={{ margin: '5px 0px 15px 0px' }} id="name" placeholder='Name' onChange={handleChange} />
              <div>Email *</div>
              <Form.Group>
                <Form.Control isInvalid={inputValues.email.length > 0 ? !emailRegExp.test(inputValues.email) : false} type="email" placeholder='email@example.com' required value={inputValues.email} style={{ margin: '5px 0px 15px 0px' }} id="email" onChange={handleChange} />

                <Form.Control.Feedback type="invalid">
                  Invalid email
                </Form.Control.Feedback>
              </Form.Group>

              {
                listGuests.map((guest, index) => (
                  <div key={index} className='body-right__guest'>
                    <Row>
                      <Col xs={10} sm={10} md={10} lg={10} xxl={10}>
                      </Col>
                      <Col className='body-right__guest__btndelete' xs={2} sm={2} md={2} lg={2} xxl={2}>
                        <div onClick={() => handleRemoveGuest(guest.id)}>Delete</div>
                      </Col>
                    </Row>
                    <div>Email Guest {index + 1} *</div>
                    <Form.Group>
                      <Form.Control isInvalid={guest[`${guest.id}`] ? !emailRegExp.test(guest[`${guest.id}`]) : true} type="email" placeholder='email@example.com' required value={guest[`${guest.id}`] ? guest[`${guest.id}`] : ''} style={{ margin: '5px 0px 15px 0px' }} id={`${guest.id}`} onChange={(e) => handleChangeGuest(e, guest.id)} />

                      <Form.Control.Feedback type="invalid">
                        Invalid email
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                ))
              }
              <Button style={{ marginBottom: '30px' }} variant="outline-primary" onClick={() => handleAddGuest()} >ADD GUESTS</Button>
              {
                appointmentTemplate && appointmentTemplate?.questions?.map((question, index) => (
                  <div className='body-right__question' key={index}>
                    <div >{question.label} {question.checked ? ' *' : ''}</div>
                    {
                      question && question.type === 'phone' ?
                        <div style={{ margin: '10px 0px' }}>
                          <PhoneInput
                            placeholder="Enter phone number"
                            onChange={phone => handleChange(phone, question.id)}
                            value={inputValues[question.id]}
                            inputProps={{
                              name: 'phone',
                              required: question.checked
                            }}
                          />
                        </div>
                        :
                        <Form.Control required={question.checked} value={inputValues[question.id]} style={{ margin: '5px 0px 15px 0px' }} id={question.id} placeholder={question.label} onChange={handleChange} />
                    }
                  </div>
                ))
              }
          </>
      }
    </>
  )
}

export default ModalCalendarForm