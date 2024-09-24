import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import {COLORS} from "../../helpers/colors";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import {CustomAppInput} from "./CustomAppInput";
import {useDispatch, useSelector} from "react-redux";
import {
    clearFilters,
    setCategoryValue,
    setCreationDateValue,
    setPopularityValue,
    setSearchText
} from "../../store/filterSlice";
import DropDownPicker from "react-native-dropdown-picker";
import {courseCategoriesArr} from "../../mock/mock";
import {CustomAppButton} from "./CustomAppButton";

const { height, width } = Dimensions.get('window');

const categoryFilterItems = courseCategoriesArr.map((el) => {
    return {
        label: el.categoryName,
        value: el.id
    }
})

const popularityFilterItems = [
    {label: 'More popular', value: 1 },
    {label: 'Less popular', value: 2 },
]

const creationDateFilterItems = [
    {label: 'New', value: 1 },
    {label: 'Old', value: 2 },
]

export const SideDrawer = ({ isOpen, onClose }) => {
    const animatedValue = useRef(new Animated.Value(-(width + 20))).current;

    const dispatch = useDispatch()

    const {searchText, categoryValue, popularity, creationDate} = useSelector(state => state.filter)

    const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);

    const [openPopularityDropdown, setOpenPopularityDropdown] = useState(false);

    const [openDateDropdown, setOpenDateDropdown] = useState(false);

    const [value, setValue] = useState(null);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isOpen ? -20 : -(width + 20),
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isOpen, animatedValue]);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.drawer,
                    {
                        transform: [{ translateX: animatedValue }],
                    },
                ]}
            >
                <View style={styles.drawerContent}>
                    <TouchableOpacity  onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={32} color={COLORS.darkGray} />
                    </TouchableOpacity>


                    <Text style={styles.drawerTitle}>Filters</Text>

                    <CustomAppInput
                        placeholderText={"Search"}
                        icon={<FontAwesome name="close" size={24} color={COLORS.darkGray} />}
                        onChangeValue={(text) => dispatch(setSearchText(text))}
                        onRightIconPress={() => dispatch(setSearchText(''))}
                        value={searchText}
                    />

                    <Text style={styles.label}>Category</Text>
                    <DropDownPicker
                        open={openCategoryDropdown}
                        value={categoryValue}
                        items={categoryFilterItems}
                        setOpen={setOpenCategoryDropdown}
                        setValue={setValue}
                        onSelectItem={(value) => {
                            dispatch(setCategoryValue(value.value))
                        }}
                        style={styles.dropStyle}
                        textStyle={styles.textStyle}
                        labelStyle={styles.labelStyle}
                        containerStyle={{
                            zIndex: 1002
                        }}
                    />

                    <Text style={[styles.drawerTitle, {marginTop: 20}]}>Sorting</Text>

                    <Text style={[styles.label]}>Popularity</Text>
                    <DropDownPicker
                        open={openPopularityDropdown}
                        value={popularity}
                        items={popularityFilterItems}
                        setOpen={setOpenPopularityDropdown}
                        setValue={setValue}
                        onSelectItem={(value) => {
                            dispatch(setPopularityValue(value.value))
                        }}
                        style={styles.dropStyle}
                        textStyle={styles.textStyle}
                        labelStyle={styles.labelStyle}
                        containerStyle={{
                            zIndex: 1001
                        }}
                    />

                    <Text style={[styles.label, {marginTop: 15}]}>Date of creation</Text>
                    <DropDownPicker
                        open={openDateDropdown}
                        value={creationDate}
                        items={creationDateFilterItems}
                        setOpen={setOpenDateDropdown}
                        setValue={setValue}
                        onSelectItem={(value) => {
                            dispatch(setCreationDateValue(value.value))
                        }}
                        style={styles.dropStyle}
                        textStyle={styles.textStyle}
                        labelStyle={styles.labelStyle}
                        containerStyle={{
                            position: 'relative',
                            zIndex: 1000
                        }}
                    />


                    <View style={styles.buttonsContainer}>

                        <CustomAppButton
                            text={'Clear'}
                            additionalStyle={{
                                width: '45%'
                            }}
                            onPress={() =>  dispatch(clearFilters())}
                            bgColor={COLORS.white}
                            borderColor={COLORS.blue}
                            textColor={COLORS.blue}
                        />
                    </View>

                </View>

            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
        zIndex: 100
    },
    drawer: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: height,
        width: width,
        backgroundColor: 'rgba(0,0,0,0.38)',
    },
    drawerContent: {
        height: height,
        width: '80%',
        backgroundColor: '#F4F6FE',
        padding: 20,
        position: 'relative'
    },
    drawerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS.darkGray,
        marginBottom: 10
    },
    label: {
        marginBottom: 10,
        fontSize: 18,
        color: COLORS.darkGray
    },

    dropStyle: {
        borderRadius: 18,
        paddingVertical: 18,
        borderWidth: 2,
        borderColor: 'gray',
    },
    textStyle: {
        paddingHorizontal: 15,
        color: COLORS.darkGray,
        fontSize: 18
    },
    labelStyle: {
        paddingHorizontal: 15,
        color: COLORS.darkGray,
        fontSize: 18,
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
});
