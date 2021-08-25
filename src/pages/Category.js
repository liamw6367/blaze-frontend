import React from 'react'
import './../scss/categoryPage.scss'
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from "@material-ui/core/TextField";
import CategoryItem from "./CategoryItem";
import Navbar from "../components/Navbar";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },

    popupIndicator: {
        "& span": {
            "& svg": {
                "& path": {
                    d: "path('M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z')"
                }
            }
        }
    }

}));


function Category() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <>
            <Navbar isLoggedIn={true}/>
            <div className='Category'>
                <ul className="menu_banner">
                    <li>
                        <a href="#">Household Items</a>
                    </li>
                    <li>
                        <a href="#">Bath & Body</a>
                    </li>
                    <li>
                        <a href="#">Food & Snacks</a>
                    </li>
                    <li>
                        <a href="#">Baby Care</a>
                    </li>
                    <li>
                        <a href="#">Home & Kitchen</a>
                    </li>
                    <li>
                        <a href="#">Fruits & Vegetables</a>
                    </li>
                    <li>
                        <a href="#">More >></a>
                    </li>
                </ul>
                <div className='babyCare_leftMenu'>
                    <div>
                        <p className='contentName'>Baby Care</p>
                        <div className={classes.root}>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header">
                                    <Typography className={classes.heading}>Baby Food</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul>
                                        <li>0-6 Month</li>
                                        <li>6-12 Month</li>
                                        <li>12-18 Month</li>
                                        <li>18-24 Month</li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header">
                                    <Typography className={classes.heading}>Diapers & Wipes</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul>
                                        <li>0-6 Month</li>
                                        <li>6-12 Month</li>
                                        <li>12-18 Month</li>
                                        <li>18-24 Month</li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel3bh-content"
                                    id="panel3bh-header">
                                    <Typography className={classes.heading}>Baby Skin & Hair Care</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul>
                                        <li>0-6 Month</li>
                                        <li>6-12 Month</li>
                                        <li>12-18 Month</li>
                                        <li>18-24 Month</li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel4bh-content"
                                    id="panel4bh-header">
                                    <Typography className={classes.heading}>Baby Accessories & More</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul>
                                        <li>0-6 Month</li>
                                        <li>6-12 Month</li>
                                        <li>12-18 Month</li>
                                        <li>18-24 Month</li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel5bh-content"
                                    id="panel5bh-header">
                                    <Typography className={classes.heading}>Mothers & Maternity</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul>
                                        <li>0-6 Month</li>
                                        <li>6-12 Month</li>
                                        <li>12-18 Month</li>
                                        <li>18-24 Month</li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>
                <div className="babyCare_body">
                    <div className="sort_by">
                        <p>Sort By</p>

                        <Autocomplete
                            id="price_select"
                            options={prices}
                            classes={{
                                option: classes.option,
                                popupIndicator: classes.popupIndicator
                            }}
                            autoHighlight
                            getOptionLabel={(option) => option.value}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Price(low to high)"
                                    variant="outlined"
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                    </div>
                    <p className='month_txt'>0-6 Month</p>
                    <div className="babyCare_items">
                        <CategoryItem/>
                        <CategoryItem/>
                        <CategoryItem/>
                        <CategoryItem/>

                        <CategoryItem/>
                        <CategoryItem/>
                        <CategoryItem/>
                        <CategoryItem/>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Category


const prices = [
    {value: 'Value 1'},
    {value: 'Value 2'},
    {value: 'Value 3'},
    {value: 'Value 4'},
    {value: 'Value 5'},
];