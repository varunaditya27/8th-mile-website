import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
  name: String,
  arrived: { type: Boolean, default: false },
}, { timestamps: false });

const orderSchema = new mongoose.Schema({
  _id: String, 
  merchantOrderId: String,
//  phonePayOrderId: String,      commented out as Cashfree is being used
  cashfreeOrderId: String,
  
  // Payment provider tracking
  provider: {
    type: String,
    enum: ['cashfree'],
    default: 'cashfree',
    index: true
  },
  
  // Generic provider fields
  providerOrderId: { type: String, index: true, sparse: true },
  providerPaymentId: { type: String, index: true, sparse: true },
  paymentSessionId: { type: String, sparse: true },
  paymentLink: String,
  
  // Payment metadata
  currency: { type: String, default: 'INR' },
  mode: {
    type: String,
    enum: ['sandbox', 'production'],
    default: 'sandbox'
  },
  
  paymentStatus: { 
    type: String, 
    enum: ['PENDING', 'SUCCESS', 'FAILED'],
    required: true
  },
  cashfreeStatus: {
    type: String,
    default: 'ACTIVE'
  },
  mailSent: {
    type: Boolean,
    default: false
  },
  
  // Customer details
  name: String,
  email: String,
  phone: String,
  amount: Number,
  
  // Order type
  type: { 
    type: String, 
    enum: ['pass', 'event'],
    required: true
  },
  classId: String,
  noOfParticipants: {
    type: Number,
    default: 1
  },
  participantsData: [participantSchema],
  
  // Audit and webhook tracking
  rawPaymentResponse: mongoose.Schema.Types.Mixed,
  webhookSignature: String,
  webhookVerifiedAt: Date,
  
  // Refund tracking
  refundedAt: Date,
  refundInfo: mongoose.Schema.Types.Mixed,
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { 
  collection: 'orders',
  timestamps: true
});

// Indexes for performance
orderSchema.index({ merchantOrderId: 1 }, { unique: true, sparse: true });
orderSchema.index({ cashfreeOrderId: 1 }, { sparse: true });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ provider: 1, paymentStatus: 1 });

// Create or retrieve model
const Order = mongoose.models.Order || 
  mongoose.model('Order', orderSchema);

export default Order;