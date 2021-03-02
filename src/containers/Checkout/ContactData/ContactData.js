import { Component } from "react";
import axInstance from '../../../axios-orders';


import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
        formValid : false,
        orderForm : {
            name :{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value : '',
                validation: {
                    required : true
                },
                valid : false,
                touched : false
            },
            street :{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Stree',
                },
                value : '',
                validation: {
                    required : true
                },
                valid : false,
                touched : false
            },
            zipcode :{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code',
                },
                value : '',
                validation: {
                    required : true
                },
                valid : false,
                touched : false
            },
            email :{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email',
                },
                value : '',
                validation: {
                    required : true
                },
                valid : false,
                touched : false
            },
            deliveryMethod :{
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value : 'fastest', displayValue:"The Fasters"},
                        {value : 'norm', displayValue:"Standards"}]
                },
                value : 'fastest',
                valid : true,
                touched : false
            }
        }
    }

    checkValidity(value,rules){
        let isValid = true ;
        if( rules && rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        return isValid;
    }

    orderSubmitHandler = (event) =>{
        event.preventDefault();


        this.setState({loading:true});


        const formData = {};

        for(let formElemenetId in this.state.orderForm){
            formData[formElemenetId] = this.state.orderForm[formElemenetId].value;
        }



        const order = {
            ingredients : this.props.ingredients,
            price : this.props.totalPrice,
            orderData : formData
        }
 
        axInstance.post('orders.json',order)
        .then(response => {
            console.log(response)
            this.setState({loading:false});
        })
        .catch(response => {
             this.setState({loading:false});
             console.log(response)
         });

    }

    inputChangedHandler = (event, inputIdentifier) => {
        console.log(inputIdentifier)

        const updateOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {...updateOrderForm[inputIdentifier]};

        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        console.log(updatedFormElement.valid);
        updateOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputId in updateOrderForm){
            formIsValid = updateOrderForm[inputId].valid && formIsValid;
        }
        console.log(formIsValid);

        this.setState({orderForm: updateOrderForm, formIsValid: formIsValid});


    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (            
        <form onSubmit={this.orderSubmitHandler}>
            {formElementsArray.map(element => {
                return  (<Input key={element.id} 
                    invalid={!element.config.valid}
                    touched={element.config.touched}
                    changed={(event)=>this.inputChangedHandler(event,element.id)}
                    elementType={element.config.elementType} 
                    elementConfig={element.config.elementConfig} 
                    value={element.config.value}/>)
            })}

            <Button inputtype="input"  btnType="Success" disabled={!this.state.formIsValid}>Place Order</Button>
        </form>);

        if( this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter  your Contact Data</h4>
                {form}
            </div>
        )
    }

}

export default ContactData;