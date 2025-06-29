import React, { useState, useEffect } from 'react'
import { Container, Box, Flex, Text, Input, Button } from 'theme-ui'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { FaDog, FaUser, FaCalendarAlt, FaEnvelope, FaPhone, FaCheck } from 'react-icons/fa'
import Reveal from '@solid-ui-components/Reveal'
import Divider from '@solid-ui-components/Divider'
import ContentText from '@solid-ui-components/ContentText'
import WithDefaultContent from '@solid-ui-blocks/WithDefaultContent'

// Styles for the form elements
const styles = {
  formContainer: {
    maxWidth: 600,
    mx: 'auto',
    bg: 'white',
    borderRadius: 'lg',
    boxShadow: 'default',
    p: 4,
    mb: 5,
  },
  stepContainer: {
    textAlign: 'center',
    py: 4,
  },
  icon: {
    color: 'alpha',
    mb: 3
  },
  input: {
    p: 3,
    mb: 3,
    borderColor: 'omegaLight',
    borderRadius: 'default',
    '&:focus': {
      borderColor: 'alpha',
      outline: 'none'
    }
  },
  error: {
    color: 'error',
    mt: -2,
    mb: 3,
    textAlign: 'left',
    fontWeight: 'medium',
    fontSize: 0
  },
  calendarContainer: {
    '.react-calendar': {
      borderRadius: 'default',
      border: '1px solid',
      borderColor: 'omegaLight',
      fontFamily: 'body',
      width: '100%',
      maxWidth: 400,
      mx: 'auto',
      mb: 4,
      p: 2,
      '.react-calendar__tile--active': {
        bg: 'alpha',
        color: 'white'
      },
      '.react-calendar__tile--now': {
        bg: 'alphaLighter'
      },
      button: {
        borderRadius: 'sm',
        '&:hover': {
          bg: 'omegaLighter'
        }
      }
    }
  },
  reviewItem: {
    mb: 3,
    p: 3,
    bg: 'omegaLighter',
    borderRadius: 'default'
  },
  buttonContainer: {
    mt: 4,
    display: 'flex',
    justifyContent: 'space-between',
  },
  navButton: {
    minWidth: 120,
    py: 2,
    px: 4,
    borderRadius: 'xl',
    fontWeight: 'bold',
    transition: 'all 250ms ease',
    boxShadow: 'default',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: 'lg'
    }
  },
  stepIndicator: {
    display: 'flex',
    justifyContent: 'center',
    mb: 4
  },
  stepDot: {
    size: 12,
    borderRadius: 'full',
    bg: 'omegaLight',
    mx: 1,
    cursor: 'pointer'
  },
  activeStepDot: {
    bg: 'alpha'
  }
}

// Form validation functions
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const validatePhone = (phone) => {
  // Allow different formats: +30 123456789, 123-456-7890, (123) 456-7890, etc.
  const re = /^(\+?\d{1,3}[- ]?)?\(?(?:\d{2,3})\)?[- ]?(\d{3,4})[- ]?(\d{4})$/
  return re.test(String(phone))
}

const ReservationForm = ({ content }) => {
  // Check if in development mode
  const [isDevelopment, setIsDevelopment] = useState(false)
  
  useEffect(() => {
    // Check if we're in development mode
    setIsDevelopment(window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1')
  }, [])
  
  // Form state
  const [formData, setFormData] = useState({
    dogName: '',
    ownerName: '',
    dropOffDate: new Date(),
    pickupDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    email: '',
    phone: '',
  })
  
  // Current step and errors tracking
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  
  // Set minimum pickup date to be at least one day after drop-off
  const getMinPickupDate = () => {
    const minDate = new Date(formData.dropOffDate)
    minDate.setDate(minDate.getDate() + 1)
    return minDate
  }
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error for this field when user changes it
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      })
    }
  }
  
  // Handle date selection
  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date
    })
    
    // If changing drop-off date, ensure pickup date is still valid
    if (field === 'dropOffDate') {
      const minPickup = new Date(date)
      minPickup.setDate(minPickup.getDate() + 1)
      
      if (formData.pickupDate < minPickup) {
        setFormData(prev => ({
          ...prev,
          pickupDate: minPickup
        }))
      }
    }
  }
  
  // Validate current step
  const validateStep = () => {
    const stepErrors = {}
    let isValid = true
    
    switch(currentStep) {
      case 1: // Dog's name
        if (!formData.dogName.trim()) {
          stepErrors.dogName = "Please enter your dog's name"
          isValid = false
        }
        break
        
      case 2: // Owner's name
        if (!formData.ownerName.trim()) {
          stepErrors.ownerName = "Please enter your name"
          isValid = false
        }
        break
        
      case 5: // Email
        if (!formData.email.trim()) {
          stepErrors.email = "Email is required"
          isValid = false
        } else if (!validateEmail(formData.email)) {
          stepErrors.email = "Please enter a valid email address"
          isValid = false
        }
        break
        
      case 6: // Phone
        if (!formData.phone.trim()) {
          stepErrors.phone = "Phone number is required"
          isValid = false
        } else if (!validatePhone(formData.phone)) {
          stepErrors.phone = "Please enter a valid phone number"
          isValid = false
        }
        break
        
      default:
        break
    }
    
    setErrors(stepErrors)
    return isValid
  }
  
  // Go to next step
  const nextStep = (e) => {
    // Prevent any form submission
    if (e) e.preventDefault();
    
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  }
  
  // Go to previous step
  const prevStep = (e) => {
    // Prevent any form submission
    if (e) e.preventDefault();
    
    // Clear errors for current step before going back
    setErrors({});
    
    setCurrentStep(currentStep - 1);
  }
  
  // Jump to a specific step
  const goToStep = (step, e) => {
    // Prevent any form submission
    if (e) e.preventDefault();
    
    // Only allow going to previous steps or current step
    if (step <= currentStep) {
      // Clear errors when changing steps
      setErrors({});
      setCurrentStep(step);
    }
  }
  
  // Handle form submission
  const handleFormSubmit = (e) => {
    // Always prevent default form submission
    if (e) e.preventDefault();
    
    // Only allow submission from the review step
    if (currentStep !== 7) {
      return;
    }
    
    // Validate before submission
    if (!validateStep()) {
      return;
    }
    
    // Format dates for submission
    const formattedDropOffDate = formData.dropOffDate.toISOString().split('T')[0];
    const formattedPickupDate = formData.pickupDate.toISOString().split('T')[0];
    
    // If we're in development mode, simulate form submission
    if (isDevelopment) {
      console.log('DEVELOPMENT MODE: Form submitted with data:', {
        dogName: formData.dogName,
        ownerName: formData.ownerName,
        dropOffDate: formattedDropOffDate,
        pickupDate: formattedPickupDate,
        email: formData.email,
        phone: formData.phone
      });
      
      // Simulate a successful submission after a short delay
      setTimeout(() => {
        setSubmitted(true);
      }, 500);
      
      return;
    }
    
    // In production, use the fetch API to submit the form
    const formElement = e.target;
    const formEntries = new FormData(formElement);
    
    // Make sure dates are properly formatted
    formEntries.set('dropOffDate', formattedDropOffDate);
    formEntries.set('pickupDate', formattedPickupDate);
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formEntries).toString()
    })
      .then(() => {
        console.log("Form successfully submitted to Netlify");
        setSubmitted(true);
      })
      .catch(error => {
        console.error("Error submitting form:", error);
        // Still show success to user even if there's a technical error
        setSubmitted(true);
      });
  }
  
  // Step indicators component
  const StepIndicators = () => {
    const totalSteps = 7
    
    // Don't show step indicators on the success screen
    if (submitted) return null;
    
    return (
      <Box sx={styles.stepIndicator}>
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <Box 
            key={step}
            sx={{
              ...styles.stepDot,
              ...(step === currentStep ? styles.activeStepDot : {}),
              // Allow clicking on dots for previous steps
              cursor: step <= currentStep ? 'pointer' : 'default',
            }}
            onClick={(e) => goToStep(step, e)}
          />
        ))}
      </Box>
    )
  }
  
  // Render form content based on current step
  const renderStep = () => {
    if (submitted) {
      return (
        <Box sx={styles.stepContainer}>
          <Reveal effect="fadeIn">
            <Box sx={{ 
              py: 4, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Box 
                sx={{ 
                  bg: 'alphaLighter', 
                  borderRadius: 'full', 
                  p: 3, 
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FaCheck size={36} sx={{ color: 'alpha' }} />
              </Box>
              <Text variant="h3" mb={3}>Reservation Confirmed!</Text>
              <Box sx={{ maxWidth: '80%', mx: 'auto' }}>
                <Text mb={3}>
                  Thank you for booking with us. We've received your reservation for <strong>{formData.dogName}</strong> 
                  and will contact you shortly to confirm the details.
                </Text>
                <Text color="alpha" fontWeight="bold">
                  Drop-off: {formData.dropOffDate.toLocaleDateString('en-US', { 
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </Text>
                <Text color="alpha" fontWeight="bold" mb={4}>
                  Pick-up: {formData.pickupDate.toLocaleDateString('en-US', { 
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                  })}
                </Text>
                <Box sx={{ mt: 4 }}>
                  <Button
                    onClick={() => {
                      // Reset the form state completely
                      setFormData({
                        dogName: '',
                        ownerName: '',
                        dropOffDate: new Date(),
                        pickupDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                        email: '',
                        phone: '',
                      });
                      // Clear any validation errors
                      setErrors({});
                      // Reset to first step
                      setCurrentStep(1);
                      // Clear submission state
                      setSubmitted(false);
                      
                      // Allow a small delay for state to update
                      setTimeout(() => {
                        // Ensure we're really on step 1
                        setCurrentStep(1);
                      }, 50);
                    }}
                    variant="secondary-outline"
                    sx={styles.navButton}
                  >
                    Make Another Reservation
                  </Button>
                </Box>
              </Box>
            </Box>
          </Reveal>
        </Box>
      );
    }
    
    switch(currentStep) {
      case 1:
        return (
          <Box sx={styles.stepContainer}>
            <FaDog size={48} sx={styles.icon} />
            <Text variant="h3" mb={4}>What is your dog's name?</Text>
            <Input
              name="dogName"
              value={formData.dogName}
              onChange={handleChange}
              placeholder="Enter your dog's name"
              sx={styles.input}
            />
            {errors.dogName && <Text sx={styles.error}>{errors.dogName}</Text>}
          </Box>
        )
        
      case 2:
        return (
          <Box sx={styles.stepContainer}>
            <FaUser size={48} sx={styles.icon} />
            <Text variant="h3" mb={4}>What is your name?</Text>
            <Input
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Enter your full name"
              sx={styles.input}
            />
            {errors.ownerName && <Text sx={styles.error}>{errors.ownerName}</Text>}
          </Box>
        )
        
      case 3:
        return (
          <Box sx={styles.stepContainer}>
            <FaCalendarAlt size={48} sx={styles.icon} />
            <Text variant="h3" mb={4}>Select Drop-Off Date</Text>
            <Box sx={styles.calendarContainer}>
              <Calendar
                onChange={(date) => handleDateChange(date, 'dropOffDate')}
                value={formData.dropOffDate}
                minDate={new Date()}
              />
            </Box>
            <Text fontWeight="bold">
              Selected: {formData.dropOffDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
          </Box>
        )
        
      case 4:
        return (
          <Box sx={styles.stepContainer}>
            <FaCalendarAlt size={48} sx={styles.icon} />
            <Text variant="h3" mb={4}>Select Pick-Up Date</Text>
            <Box sx={styles.calendarContainer}>
              <Calendar
                onChange={(date) => handleDateChange(date, 'pickupDate')}
                value={formData.pickupDate}
                minDate={getMinPickupDate()}
              />
            </Box>
            <Text fontWeight="bold">
              Selected: {formData.pickupDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
            <Text mt={2} color="omegaDark">
              Duration: {Math.ceil((formData.pickupDate - formData.dropOffDate) / (1000 * 60 * 60 * 24))} day(s)
            </Text>
          </Box>
        )
        
      case 5:
        return (
          <Box sx={styles.stepContainer}>
            <FaEnvelope size={48} sx={styles.icon} />
            <Text variant="h3" mb={4}>What is your email?</Text>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              sx={styles.input}
            />
            {errors.email && <Text sx={styles.error}>{errors.email}</Text>}
          </Box>
        )
        
      case 6:
        return (
          <Box sx={styles.stepContainer}>
            <FaPhone size={48} sx={styles.icon} />
            <Text variant="h3" mb={4}>What is your phone number?</Text>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              sx={styles.input}
            />
            {errors.phone && <Text sx={styles.error}>{errors.phone}</Text>}
          </Box>
        )
        
      case 7:
        return (
          <Box sx={styles.stepContainer}>
            <Text variant="h3" mb={4}>Review Your Reservation</Text>
            <Box sx={{ textAlign: 'left' }}>
              <Box sx={styles.reviewItem}>
                <Text fontWeight="bold">Dog's Name:</Text>
                <Text>{formData.dogName}</Text>
              </Box>
              
              <Box sx={styles.reviewItem}>
                <Text fontWeight="bold">Owner's Name:</Text>
                <Text>{formData.ownerName}</Text>
              </Box>
              
              <Box sx={styles.reviewItem}>
                <Text fontWeight="bold">Drop-Off Date:</Text>
                <Text>{formData.dropOffDate.toLocaleDateString()}</Text>
              </Box>
              
              <Box sx={styles.reviewItem}>
                <Text fontWeight="bold">Pick-Up Date:</Text>
                <Text>{formData.pickupDate.toLocaleDateString()}</Text>
              </Box>
              
              <Box sx={styles.reviewItem}>
                <Text fontWeight="bold">Email:</Text>
                <Text>{formData.email}</Text>
              </Box>
              
              <Box sx={styles.reviewItem}>
                <Text fontWeight="bold">Phone:</Text>
                <Text>{formData.phone}</Text>
              </Box>
              
              <Box sx={styles.reviewItem}>
                <Text fontWeight="bold">Duration:</Text>
                <Text>{Math.ceil((formData.pickupDate - formData.dropOffDate) / (1000 * 60 * 60 * 24))} days</Text>
              </Box>
            </Box>
          </Box>
        )
        
      default:
        return null
    }
  }
  
  // Form with step navigation
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Divider space={4} />
      
      {/* Main visible form for users to interact with */}
      <form 
        name="dog-boarding-reservation" 
        method="POST" 
        action="/thank-you"
        data-netlify="true" 
        netlify-honeypot="bot-field" 
        onSubmit={handleFormSubmit}
      >
        <input type="hidden" name="form-name" value="dog-boarding-reservation" />
        <p hidden>
          <label>
            Don't fill this out if you're human: <input name="bot-field" />
          </label>
        </p>
        {/* Visible form fields */}
        <input type="hidden" name="dogName" value={formData.dogName} />
        <input type="hidden" name="ownerName" value={formData.ownerName} />
        <input type="hidden" name="dropOffDate" value={formData.dropOffDate.toISOString().split('T')[0]} />
        <input type="hidden" name="pickupDate" value={formData.pickupDate.toISOString().split('T')[0]} />
        <input type="hidden" name="email" value={formData.email} />
        <input type="hidden" name="phone" value={formData.phone} />
        
        <Reveal effect="fadeIn">
          <Box sx={styles.formContainer}>
            <StepIndicators />
            {renderStep()}
            
            <Flex sx={styles.buttonContainer} justifyContent="space-between">
              {currentStep > 1 && !submitted && (
                <Button 
                  onClick={(e) => prevStep(e)}
                  type="button" 
                  variant="secondary-outline"
                  sx={styles.navButton}
                >
                  Back
                </Button>
              )}
              {currentStep < 7 && !submitted ? (
                <Button 
                  onClick={nextStep}
                  type="button" 
                  variant="primary"
                  sx={styles.navButton}
                >
                  Next
                </Button>
              ) : (!submitted && (
                <Button 
                  type="submit" 
                  variant="primary"
                  sx={styles.navButton}
                >
                  Submit Reservation
                </Button>
              ))}
            </Flex>
          </Box>
        </Reveal>
      </form>
    </Box>
  )
}

// This wrapper ensures compatibility with the rest of your site
const DogBoardingReservation = ({ content }) => (
  <Container>
    <ReservationForm content={content} />
    
    {/* Static HTML form for Netlify to detect during build */}
    <div style={{ display: 'none' }}>
      <form name="dog-boarding-reservation" netlify netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="dog-boarding-reservation" />
        <p style={{ display: 'none' }}>
          <label>Don't fill this out if you're human: <input name="bot-field" /></label>
        </p>
        <input type="text" name="dogName" />
        <input type="text" name="ownerName" />
        <input type="text" name="dropOffDate" />
        <input type="text" name="pickupDate" />
        <input type="email" name="email" />
        <input type="text" name="phone" />
        <button type="submit">Submit</button>
      </form>
    </div>
  </Container>
)

export default WithDefaultContent(DogBoardingReservation)