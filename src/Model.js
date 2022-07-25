import React from 'react';

export default function Model() {
    return (
    <mesh rotation={[90, 0, 20]}>
        <boxBufferGeometry attach="geometry" args={[1,1,1]}/> 
        <meshLambertMaterial attach="material" color="purple" />
    </mesh>
    );
}