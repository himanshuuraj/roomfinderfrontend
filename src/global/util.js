import { Platform, Dimensions } from "react-native";
let { width, height } = Dimensions.get('window');

//let width = Platform.width;
//let height = Platform.height;

width = Math.round(width);
height = Math.round(height);

// Use iPhone6 as base size which is 375 x 667
const baseWidth = 375;
const baseHeight = 667;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const getFont =
    (size) => Math.ceil((size * scale));

//let height = Platform.height;
//let width = Platform.width;

export const getHeight = percent => {
    return Math.round((height * percent) / 100);
}

export const getWidth = percent => {
    return Math.round((width * percent) / 100);
}

export const Color = {
    gradientColor1 : "#00cc66",
    gradientColor2 : "#99ff33",
    themeColor : "#6536FF",
    themeFontColor : "#fff",
    white : "#fff",
    gray : "gray",
    black : "#000",
    green : "#3cb878",
    backgroundThemeColor : "#eee"
}

export const Font = {
    themeFont : "monospace"
}

export const HomeType = {
    HOUSE : "p.g.", 
    FLAT : 'flat',
    LODGE : 'lodge'
}

export const UserType = {
    OWNER : 'owner',
    RENTAL : 'rental'
}

export const FoodPreference = {
    VEG : 'vegeterian',
    NONVEG : 'non-vegeterian'
}

export const AvailableFor = {
    BOYS : 'boys',
    GIRLS : 'girls',
    BOTH : 'both'
}

export const RentType = {
    ROOM : 'room',
    BED : 'bed'
}