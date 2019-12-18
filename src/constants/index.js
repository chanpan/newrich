// Login Page
export const LOGIN_FETCHING = 'LOGIN_FETCHING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';

// Register Page
export const HTTP_REGISTER_FETCHING = "HTTP_REGISTER_FETCHING";
export const HTTP_REGISTER_SUCCESS = "HTTP_REGISTER_SUCCESS";
export const HTTP_REGISTER_FAILED = "HTTP_REGISTER_FAILED"; 

export const SHOP_UPDATE_ORDER = "SHOP_UPDATE_ORDER";
export const SHOP_UPDATE_PAYMENT = "SHOP_UPDATE_PAYMENT";

// Error Code
export const E_PICKER_CANCELLED = 'E_PICKER_CANCELLED'
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR = 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR'
export const E_PERMISSION_MISSING = 'E_PERMISSION_MISSING'
export const E_PICKER_NO_CAMERA_PERMISSION = 'E_PICKER_NO_CAMERA_PERMISSION'
export const E_USER_CANCELLED = 'E_USER_CANCELLED'
export const E_UNKNOWN = 'E_UNKNOWN'
export const E_DEVELOPER_ERROR = 'E_DEVELOPER_ERROR'
export const TIMEOUT_NETWORK = 'ECONNABORTED' // request service timeout
export const NOT_CONNECT_NETWORK = 'NOT_CONNECT_NETWORK' 

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE = 'Cannot connect to server, Please try again.' 
export const NETWORK_TIMEOUT_MESSAGE = 'A network timeout has occurred, Please try again.'  
export const UPLOAD_PHOTO_FAIL_MESSAGE = 'An error has occurred. The photo was unable to upload.' 


// Speciment Page
export const SPECIMENT_FETCHING = 'SPECIMENT_FETCHING';
export const SPECIMENT_SUCCESS = 'SPECIMENT_SUCCESS';
export const SPECIMENT_FAILED = 'SPECIMENT_FAILED';  

//modal 
export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';


export const apiUrl =  "http://66.42.49.97:8081/api/v2";
export const imageUrl = "http://localhost:8081";


export const server = {    
    LOGIN_URL : `login`,
    QUERY_URL:`query`,    
    REGISTER_URL : `register`,  
    PRODUCT_URL : `product`,    
    TRANSACTION_URL : `transaction`,    
    REPORT_URL: `report`,    
    TOKEN_KEY : `token`,
}
