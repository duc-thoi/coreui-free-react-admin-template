import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'

const ResetPassword = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Reset password</h1>
                  <p className="text-body-secondary">
                    Enter your email address and we will send you instructions on how to reset your
                    password.
                  </p>
                  <div className="mb-4">
                    <CFormLabel htmlFor="email">Email address</CFormLabel>
                    <CFormInput
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      autoComplete="email"
                    />
                  </div>
                  <div className="d-grid gap-2">
                    <CButton color="success" size="lg" type="submit">
                      Send reset instructions
                    </CButton>
                    <CButton color="link" className="text-body-secondary">
                      Back to sign in
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ResetPassword
