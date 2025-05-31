const wheel = document.querySelector('.wheel');
const spinButton = document.querySelector('.spin-button');
const resultDisplay = document.querySelector('.result');

// Define segments and their colors
const segments = [
    { text: '10% OFF', color: '#FF5733' },
    { text: 'Free Coffee', color: '#33FF57' },
    { text: 'Try Again', color: '#3357FF' },
    { text: 'Big Prize!', color: '#FF33DA' },
    { text: 'Small Gift', color: '#33DAFF' },
    { text: '20% OFF', color: '#DAFF33' },
    { text: 'Next Time', color: '#FF8F33' },
    { text: 'A Smile', color: '#8F33FF' }
];

const numSegments = segments.length;
const segmentAngle = 360 / numSegments; // Angle for each segment

// Dynamically create wheel segments
segments.forEach((segment, index) => {
    const div = document.createElement('div');
    div.style.setProperty('--segment-color', segment.color);
    div.style.setProperty('--rotation', `${index * segmentAngle}deg`);
    const span = document.createElement('span');
    span.textContent = segment.text;
    div.appendChild(span);
    wheel.appendChild(div);
});

let spinning = false;

spinButton.addEventListener('click', () => {
    if (spinning) return;

    spinning = true;
    resultDisplay.textContent = '';
    wheel.style.transition = 'none'; // Remove transition for instant reset
    wheel.style.transform = 'rotate(0deg)'; // Reset rotation

    // Small delay to ensure reset takes effect visually before starting new spin
    setTimeout(() => {
        const spinDuration = 4000; // 4 seconds
        const minRotations = 5; // Minimum 5 full rotations
        const maxRotations = 8; // Maximum 8 full rotations
        const targetRotation = Math.floor(Math.random() * 360) + (minRotations + Math.floor(Math.random() * (maxRotations - minRotations + 1))) * 360;

        wheel.style.transition = `transform ${spinDuration / 1000}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
        wheel.style.transform = `rotate(${targetRotation}deg)`;

        // Calculate where the wheel will stop and determine the result
        setTimeout(() => {
            spinning = false;
            const finalRotation = targetRotation % 360; // Get the actual final angle

            // Adjust final rotation to account for the pointer's position (top center)
            // The pointer is at 0 degrees, so we need to offset the wheel's rotation.
            // If the wheel rotates 0 degrees, the segment at the 0-degree mark is pointed at.
            // Segments are created starting from 0 degrees (top-right quarter).
            // A segment's text is roughly centered in its arc.
            // We need to calculate which segment the pointer is over.
            const adjustedRotation = (360 - finalRotation + 90) % 360; // +90 to align with top pointer

            const winningSegmentIndex = Math.floor(adjustedRotation / segmentAngle);
            const winner = segments[winningSegmentIndex].text;
            resultDisplay.textContent = `You Won: ${winner}!`;

            // Optional: You could add a small animation or sound effect here
        }, spinDuration);
    }, 50); // Short delay
});
