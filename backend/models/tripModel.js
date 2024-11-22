const mongoose = require('mongoose');
const tripSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true
    },
    startKm: {  
        type: Number,
        required: true,
        min: 0
    },
    endKm: {    
        type: Number,
        required: false,  
        min: 0
    },
    startDate: {  
        type: Date,
        required: true
    },
    endDate: {    
        type: Date,
        required: false  
    },
    fare: {
        type: Number,
        required: true,
        min: 0 
    },
    fareType: {
        type: String,
        enum: ['day', 'km'], 
        required: true
    },
    advance: {
        type: Number,
        default: 0,
        min: 0 
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    discount:{
        type: Number,
        default: 0,
    }, 
    tripExpense:{
        type: Number,
        default: 0,
    }, 
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerPhoneNo: {
        type: String,
        required: true,
        trim: true
    },
    customerAadhaarNo: {
        type: String,
        required: true,
        //match: [/^\d{12}$/, 'Please fill a valid Aadhaar number'],  Validates a 12-digit Aadhaar number
        trim: true
    },
    customerEmail: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'], // Validates a standard email format
        trim: true
    },
    customerAddress: {
        type: String,
        required: true,
        trim: true
    },
    remarks: { 
        type: String,
        trim: true
    },
    income: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Income',
        default: null
    },
    invoice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
        default: null
    }
}, {
    timestamps: true
});

const Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
