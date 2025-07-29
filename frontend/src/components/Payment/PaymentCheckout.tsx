import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Text,
  VStack,
  HStack,
  Badge,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Alert,
  AlertIcon,
  Divider,
  useColorModeValue,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  InputLeftElement,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner
} from '@chakra-ui/react';
import { LockIcon, EmailIcon, PhoneIcon } from '@chakra-ui/icons';

/**
 * PaymentCheckout - Comprehensive payment processing component
 * 
 * Features:
 * - Multiple payment methods (Card, Bank Transfer, PayPal, etc.)
 * - Secure payment processing
 * - Order summary and billing
 * - International payment support
 * - PCI DSS compliance ready
 * - Bank transfer instructions
 */

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  processingTime: string;
  fees: string;
  supported: boolean;
}

interface PaymentCheckoutProps {
  selectedPlan: {
    id: string;
    name: string;
    price: number;
    billing: 'monthly' | 'annual';
    features: string[];
  };
  onPaymentComplete: (paymentDetails: any) => void;
  onCancel: () => void;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, American Express, Discover',
    icon: '💳',
    processingTime: 'Instant',
    fees: 'No additional fees',
    supported: true
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    description: 'Direct bank transfer (ACH/Wire)',
    icon: '🏦',
    processingTime: '1-3 business days',
    fees: 'No additional fees',
    supported: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay with your PayPal account',
    icon: '🅿️',
    processingTime: 'Instant',
    fees: 'No additional fees',
    supported: true
  },
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    description: 'Pay with Touch ID or Face ID',
    icon: '🍎',
    processingTime: 'Instant',
    fees: 'No additional fees',
    supported: true
  },
  {
    id: 'google_pay',
    name: 'Google Pay',
    description: 'Pay with Google Pay',
    icon: '🟢',
    processingTime: 'Instant',
    fees: 'No additional fees',
    supported: true
  },
  {
    id: 'cryptocurrency',
    name: 'Cryptocurrency',
    description: 'Bitcoin, Ethereum, and more',
    icon: '₿',
    processingTime: '10-60 minutes',
    fees: 'Network fees apply',
    supported: false // Coming soon
  }
];

const PaymentCheckout: React.FC<PaymentCheckoutProps> = ({
  selectedPlan,
  onPaymentComplete,
  onCancel
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    // Card details
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    
    // Billing address
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    
    // Bank transfer details
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking',
    
    // Agreement
    termsAccepted: false,
    marketingConsent: false
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleInputChange = (field: string, value: string | boolean) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    const subtotal = selectedPlan.price;
    const tax = subtotal * 0.08; // 8% tax (would be calculated based on location)
    return {
      subtotal,
      tax,
      total: subtotal + tax
    };
  };

  const handleSubmitPayment = async () => {
    if (!paymentData.termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const paymentDetails = {
        method: selectedPaymentMethod,
        plan: selectedPlan,
        amount: calculateTotal().total,
        paymentData: paymentData,
        transactionId: `txn_${Date.now()}`,
        timestamp: new Date().toISOString()
      };
      
      onPaymentComplete(paymentDetails);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPaymentForm = () => {
    switch (selectedPaymentMethod) {
      case 'card':
        return (
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Card Number</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  maxLength={19}
                />
              </InputGroup>
            </FormControl>

            <Grid templateColumns="1fr 1fr" gap={4}>
              <FormControl isRequired>
                <FormLabel>Expiry Date</FormLabel>
                <Input
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  maxLength={5}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>CVV</FormLabel>
                <Input
                  placeholder="123"
                  value={paymentData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  maxLength={4}
                />
              </FormControl>
            </Grid>

            <FormControl isRequired>
              <FormLabel>Cardholder Name</FormLabel>
              <Input
                placeholder="John Doe"
                value={paymentData.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              />
            </FormControl>
          </VStack>
        );

      case 'bank_transfer':
        return (
          <VStack spacing={4}>
            <Alert status="info">
              <AlertIcon />
              <Box>
                <Text fontSize="sm">
                  <strong>Bank Transfer Instructions:</strong> After placing your order, you'll receive detailed wire transfer instructions including our bank details and reference number.
                </Text>
              </Box>
            </Alert>

            <FormControl>
              <FormLabel>Your Bank Name</FormLabel>
              <Input
                placeholder="Your Bank Name"
                value={paymentData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Account Type</FormLabel>
              <Select
                value={paymentData.accountType}
                onChange={(e) => handleInputChange('accountType', e.target.value)}
              >
                <option value="checking">Checking Account</option>
                <option value="savings">Savings Account</option>
                <option value="business">Business Account</option>
              </Select>
            </FormControl>

            <Alert status="warning">
              <AlertIcon />
              <Box>
                <Text fontSize="sm">
                  Your subscription will be activated within 1-3 business days after payment confirmation.
                </Text>
              </Box>
            </Alert>
          </VStack>
        );

      case 'paypal':
        return (
          <VStack spacing={4}>
            <Alert status="info">
              <AlertIcon />
              <Box>
                <Text fontSize="sm">
                  You'll be redirected to PayPal to complete your payment securely.
                </Text>
              </Box>
            </Alert>
            
            <Box textAlign="center" p={6} border="1px dashed" borderColor="gray.300" borderRadius="md">
              <Text fontSize="lg" mb={4}>🅿️ PayPal</Text>
              <Text fontSize="sm" color="gray.600">
                Click "Complete Payment" to proceed to PayPal
              </Text>
            </Box>
          </VStack>
        );

      case 'apple_pay':
      case 'google_pay':
        return (
          <VStack spacing={4}>
            <Alert status="info">
              <AlertIcon />
              <Box>
                <Text fontSize="sm">
                  Use your device's biometric authentication to complete payment.
                </Text>
              </Box>
            </Alert>
            
            <Box textAlign="center" p={6} border="1px dashed" borderColor="gray.300" borderRadius="md">
              <Text fontSize="lg" mb={4}>
                {selectedPaymentMethod === 'apple_pay' ? '🍎 Apple Pay' : '🟢 Google Pay'}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Click "Complete Payment" to use {selectedPaymentMethod === 'apple_pay' ? 'Apple Pay' : 'Google Pay'}
              </Text>
            </Box>
          </VStack>
        );

      default:
        return null;
    }
  };

  const pricing = calculateTotal();

  return (
    <Box maxW="6xl" mx="auto" p={6}>
      <Grid templateColumns={{ base: "1fr", lg: "1fr 400px" }} gap={8}>
        {/* Payment Form */}
        <GridItem>
          <Card bg={cardBg}>
            <CardHeader>
              <Text fontSize="2xl" fontWeight="bold">
                Complete Your Purchase
              </Text>
              <Text color="gray.600">
                Choose your payment method and complete your subscription
              </Text>
            </CardHeader>

            <CardBody>
              <VStack spacing={6} align="stretch">
                {/* Payment Method Selection */}
                <Box>
                  <Text fontSize="lg" fontWeight="semibold" mb={4}>
                    Select Payment Method
                  </Text>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                    {PAYMENT_METHODS.map((method) => (
                      <Card
                        key={method.id}
                        variant={selectedPaymentMethod === method.id ? "filled" : "outline"}
                        cursor={method.supported ? "pointer" : "not-allowed"}
                        opacity={method.supported ? 1 : 0.6}
                        onClick={() => method.supported && setSelectedPaymentMethod(method.id)}
                        _hover={method.supported ? { borderColor: "purple.300" } : {}}
                      >
                        <CardBody p={3}>
                          <HStack>
                            <Text fontSize="xl">{method.icon}</Text>
                            <Box flex={1}>
                              <Text fontSize="sm" fontWeight="semibold">
                                {method.name}
                              </Text>
                              <Text fontSize="xs" color="gray.500">
                                {method.processingTime}
                              </Text>
                            </Box>
                            {!method.supported && (
                              <Badge size="sm" colorScheme="gray">
                                Soon
                              </Badge>
                            )}
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}
                  </Grid>
                </Box>

                <Divider />

                {/* Payment Form */}
                <Box>
                  <Text fontSize="lg" fontWeight="semibold" mb={4}>
                    Payment Details
                  </Text>
                  {renderPaymentForm()}
                </Box>

                <Divider />

                {/* Billing Address */}
                <Box>
                  <Text fontSize="lg" fontWeight="semibold" mb={4}>
                    Billing Information
                  </Text>
                  <VStack spacing={4}>
                    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} w="full">
                      <FormControl isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input
                          value={paymentData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          value={paymentData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                      </FormControl>
                    </Grid>

                    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} w="full">
                      <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <EmailIcon color="gray.300" />
                          </InputLeftElement>
                          <Input
                            type="email"
                            value={paymentData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Phone</FormLabel>
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <PhoneIcon color="gray.300" />
                          </InputLeftElement>
                          <Input
                            type="tel"
                            value={paymentData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                    </Grid>

                    <FormControl isRequired>
                      <FormLabel>Address</FormLabel>
                      <Input
                        value={paymentData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                      />
                    </FormControl>

                    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }} gap={4} w="full">
                      <FormControl isRequired>
                        <FormLabel>City</FormLabel>
                        <Input
                          value={paymentData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>State</FormLabel>
                        <Input
                          value={paymentData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>ZIP Code</FormLabel>
                        <Input
                          value={paymentData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        />
                      </FormControl>
                    </Grid>

                    <FormControl isRequired>
                      <FormLabel>Country</FormLabel>
                      <Select
                        value={paymentData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="AU">Australia</option>
                        <option value="JP">Japan</option>
                        <option value="OTHER">Other</option>
                      </Select>
                    </FormControl>
                  </VStack>
                </Box>

                <Divider />

                {/* Terms and Conditions */}
                <VStack spacing={3} align="stretch">
                  <Checkbox
                    isChecked={paymentData.termsAccepted}
                    onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                    colorScheme="purple"
                  >
                    <Text fontSize="sm">
                      I agree to the{' '}
                      <Button variant="link" size="sm" colorScheme="purple" onClick={onOpen}>
                        Terms of Service
                      </Button>{' '}
                      and{' '}
                      <Button variant="link" size="sm" colorScheme="purple">
                        Privacy Policy
                      </Button>
                    </Text>
                  </Checkbox>

                  <Checkbox
                    isChecked={paymentData.marketingConsent}
                    onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                    colorScheme="purple"
                  >
                    <Text fontSize="sm">
                      I agree to receive marketing communications and product updates
                    </Text>
                  </Checkbox>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>

        {/* Order Summary */}
        <GridItem>
          <Card bg={cardBg} position="sticky" top="6">
            <CardHeader>
              <Text fontSize="xl" fontWeight="bold">
                Order Summary
              </Text>
            </CardHeader>

            <CardBody>
              <VStack spacing={4} align="stretch">
                {/* Selected Plan */}
                <Box p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="md">
                  <HStack justify="space-between" mb={2}>
                    <Text fontWeight="semibold">{selectedPlan.name}</Text>
                    <Badge colorScheme="purple">{selectedPlan.billing}</Badge>
                  </HStack>
                  <Text fontSize="sm" color="gray.600">
                    {selectedPlan.billing === 'annual' ? 'Annual' : 'Monthly'} subscription
                  </Text>
                </Box>

                {/* Pricing Breakdown */}
                <VStack spacing={2} align="stretch">
                  <HStack justify="space-between">
                    <Text>Subtotal</Text>
                    <Text>${pricing.subtotal.toFixed(2)}</Text>
                  </HStack>
                  <HStack justify="space-between">
                    <Text>Tax</Text>
                    <Text>${pricing.tax.toFixed(2)}</Text>
                  </HStack>
                  <Divider />
                  <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="bold">Total</Text>
                    <Text fontSize="lg" fontWeight="bold">
                      ${pricing.total.toFixed(2)}
                    </Text>
                  </HStack>
                </VStack>

                {/* Payment Method Info */}
                <Alert status="info" size="sm">
                  <AlertIcon />
                  <Box>
                    <Text fontSize="xs">
                      {PAYMENT_METHODS.find(m => m.id === selectedPaymentMethod)?.processingTime} processing
                    </Text>
                  </Box>
                </Alert>

                {/* Action Buttons */}
                <VStack spacing={3}>
                  <Button
                    colorScheme="purple"
                    size="lg"
                    w="full"
                    onClick={handleSubmitPayment}
                    isLoading={isProcessing}
                    loadingText="Processing..."
                    isDisabled={!paymentData.termsAccepted}
                  >
                    {isProcessing ? <Spinner size="sm" /> : <LockIcon mr={2} />}
                    Complete Payment
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    w="full"
                    onClick={onCancel}
                    isDisabled={isProcessing}
                  >
                    Cancel
                  </Button>
                </VStack>

                {/* Security Info */}
                <Alert status="success" size="sm">
                  <AlertIcon />
                  <Box>
                    <Text fontSize="xs">
                      <strong>256-bit SSL encryption</strong> • PCI DSS compliant • 30-day money-back guarantee
                    </Text>
                  </Box>
                </Alert>
              </VStack>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>

      {/* Terms Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terms of Service</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Text fontSize="sm">
                <strong>1. Subscription Terms</strong><br />
                Your subscription will auto-renew at the end of each billing period unless cancelled.
              </Text>
              <Text fontSize="sm">
                <strong>2. Payment Terms</strong><br />
                All payments are processed securely. Bank transfers may take 1-3 business days to process.
              </Text>
              <Text fontSize="sm">
                <strong>3. Refund Policy</strong><br />
                30-day money-back guarantee for all new subscriptions.
              </Text>
              <Text fontSize="sm">
                <strong>4. Data Security</strong><br />
                We use industry-standard encryption and security measures to protect your data.
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PaymentCheckout;