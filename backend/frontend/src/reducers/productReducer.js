// A reducer is a function that takes the current state 
//and take an action what we gonna do to this state.//
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS, 
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS, 
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS, 
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS, 
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS, 
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_FEATURE_REQUEST,
    PRODUCT_FEATURE_SUCCESS, 
    PRODUCT_FEATURE_FAIL,
} from '../constants/productConstant';


////////////////////////List of Product Reducer/////////////////////////
///////////////////////////////////////////////////////////////////////
export const productListReducer = (state ={products:[]}, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true, products:[]}

        case PRODUCT_LIST_SUCCESS:
            return {loading:false, 
                    products:action.payload.products,
                    page:action.payload.page,
                    pages:action.payload.pages,
                }

        case PRODUCT_LIST_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state
            
    }
}
/////////////////////////Detail of Product Reducer///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const productDetailsReducer = (state ={product:{reviews:[]}}, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading:true, ...state}

        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false, product:action.payload }

        case PRODUCT_DETAILS_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state
            
    }
}
///////////////////////Delete Product Reducer as an Admin/////////////////////
/////////////////////////////////////////////////////////////////////////////
export const productDeleteReducer = (state ={}, action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading:true }

        case PRODUCT_DELETE_SUCCESS:
            return {loading:false, success:true}

        case PRODUCT_DELETE_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state
            
    }
}

//////////////////Create Product Reducer as an Admin/////////////////////
////////////////////////////////////////////////////////////////////////
export const productCreateReducer = (state ={}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return {loading:true }

        case PRODUCT_CREATE_SUCCESS:
            return {
                loading:false,
                success:true, 
                product: action.payload,
            }

        case PRODUCT_CREATE_FAIL:
            return {loading:false, error:action.payload}

        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
            
    }
}
////////////////Update Product Reducer//////////////////////
///////////////////////////////////////////////////////////
export const productUpdateReducer = (state ={product: {}}, action) => {
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {loading:true }

        case PRODUCT_UPDATE_SUCCESS:
            return {
                loading:false,
                success:true, 
                product: action.payload,
            }

        case PRODUCT_UPDATE_FAIL:
            return {loading:false, error:action.payload}

        case PRODUCT_UPDATE_RESET:
            return {product: {}}

        default:
            return state
            
    }
}

////////////////Create Review for Product Reducer//////////////////////
///////////////////////////////////////////////////////////////////////
export const productCreateReviewReducer = (state ={}, action) => {
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading:true }

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {
                loading:false,
                success:true, 
            }

        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading:false, error:action.payload}

        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
            
    }
}
////////////////Feature Product Reducer////////////////////////////////
///////////////////////////////////////////////////////////////////////
export const productFeatureReducer = (state ={products:[]}, action) => {
    switch(action.type){
        case PRODUCT_FEATURE_REQUEST:
            return {loading:true, products:[] }

        case PRODUCT_FEATURE_SUCCESS:
            return {
                loading:false,
                products:action.payload, 
            }

        case PRODUCT_FEATURE_FAIL:
            return {loading:false, error:action.payload}

        default:
            return state
            
    }
}