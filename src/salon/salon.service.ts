import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SalonCutomerData,CustomerDataDocument } from './salon.schema';
import { SignUpDto } from './dto/salon.dto';
import { SignInDto } from './dto/salon.dto';
import { hashedPassword } from 'src/utils/bcrypt';

@Injectable()
export class SalonService {
 constructor(
   @InjectModel('customerdata')
   private readonly salonCustomerModel: Model<CustomerDataDocument>,
   private readonly jwtService : JwtService,
 ) {}

async signUp(reqObj:SignUpDto):Promise<SignUpDto>{
    try {
        const { name,email,phoneNumber,password } = reqObj
        const customerPassword = await hashedPassword(password);
        const newCustomer = new this.salonCustomerModel({name,email,phoneNumber,password:customerPassword})
        return await newCustomer.save();
    } catch (error) {
        throw new BadRequestException(`Failed to create customer: ${error.message}`);
    }
}

async getAllCustomer(){
    try {
        const getCustomers = await this.salonCustomerModel.find();
        return getCustomers;
    } catch (error) {
        throw new Error(`Failed to get customers: ${error.message}`);
    }
}

async signIn(reqObj:SignInDto):Promise<{token:string}> {
    const {email, password} = reqObj;
    try {
      const customerLogin = await this.salonCustomerModel.findOne({email});
      if(!customerLogin){
        throw new  UnauthorizedException('invaild username')
      }
      const isPasswordMatch = await bcrypt.compare(password, customerLogin.password)
      if(!isPasswordMatch){
        throw new  UnauthorizedException('invaild password')
      }
      const token = this.jwtService.sign({userId:customerLogin._id})
      return {token}
  } catch (error) {
      throw new UnauthorizedException(`Failed to authenticate: ${error.message}`);
    }
  }
  
async findByUserId(id:string){
   try {
    const getUserById = await this.salonCustomerModel.findById(id)
    return getUserById
   } catch (error) {
    throw new Error(`Failed to get customers: ${error.message}`);
   }
}

}