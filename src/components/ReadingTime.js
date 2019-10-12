import React from 'react';
import FontAwesome from 'react-fontawesome';

const short = 'mug-hot';
const medium = 'cookie-bite';
const long = 'pizza-slice';
const veryLong = 'hamburger'
const icons = [short, short, medium, long, veryLong, veryLong];

const generateGetIconName = collection => index => (
    index >= collection.length ? collection[collection.length - 1] : collection[index]
);

const getIconName = generateGetIconName(icons);

const Icon = (props) => (
    <span style={{ marginRight: '5px' }}>
        <FontAwesome {...props} />
    </span>
)

function ReadingTime({ minutes }) {
    const cups = Math.round(Number(minutes) / 6);
    let numOfCups = cups || 1;
    const arr = new Array(numOfCups).fill('');

    return (
        <React.Fragment>
            {arr.map((v, i) => <Icon key={i} name={getIconName(i)} />)}
            {`${minutes} min read`}
        </React.Fragment>
    );
};

export default ReadingTime;