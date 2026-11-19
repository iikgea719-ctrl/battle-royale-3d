
import * as THREE from 'three';

// ======================================
// LAST SURVIVOR - REALISTIC HEAD MODEL
// Male Character - Version 1
// ======================================

export function createCharacterHead() {
    const head = new THREE.Group();

    // MATERIALS
    const skin = new THREE.MeshStandardMaterial({
        color: 0xc99170,
        roughness: 0.82
    });

    const skinLight = new THREE.MeshStandardMaterial({
        color: 0xd9a181,
        roughness: 0.8
    });

    const hair = new THREE.MeshStandardMaterial({
        color: 0x493022,
        roughness: 0.9
    });

    const hairDark = new THREE.MeshStandardMaterial({
        color: 0x281b17,
        roughness: 0.9
    });

    const pink = new THREE.MeshStandardMaterial({
        color: 0xf28aa8,
        roughness: 0.75
    });

    const white = new THREE.MeshStandardMaterial({
        color: 0xf5eee8,
        roughness: 0.3
    });

    const iris = new THREE.MeshStandardMaterial({
        color: 0x68452e,
        roughness: 0.35
    });

    const pupil = new THREE.MeshStandardMaterial({
        color: 0x17120f,
        roughness: 0.2
    });

    const eyebrow = hairDark;

    // HELPER
    function ellipsoid(name, material, x, y, z, sx, sy, sz) {
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 24),
            material
        );

        mesh.name = name;
        mesh.position.set(x, y, z);
        mesh.scale.set(sx, sy, sz);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        head.add(mesh);
        return mesh;
    }

    function tube(name, points, radius, material) {
        const curve = new THREE.CatmullRomCurve3(points);

        const mesh = new THREE.Mesh(
            new THREE.TubeGeometry(curve, 24, radius, 8, false),
            material
        );

        mesh.name = name;
        mesh.castShadow = true;
        head.add(mesh);

        return mesh;
    }

    // NECK
    const neck = new THREE.Mesh(
        new THREE.CylinderGeometry(0.105, 0.125, 0.28, 24),
        skin
    );

    neck.name = 'Neck';
    neck.position.y = 0.12;
    neck.castShadow = true;
    head.add(neck);

    // MAIN HEAD
    ellipsoid(
        'Head',
        skin,
        0, 0.49, 0,
        0.265, 0.35, 0.235
    );

    // JAW
    ellipsoid(
        'Jaw',
        skin,
        0, 0.30, 0.035,
        0.225, 0.18, 0.205
    );

    // CHIN
    ellipsoid(
        'Chin',
        skinLight,
        0, 0.225, 0.105,
        0.105, 0.065, 0.105
    );

    // EARS
    for (const side of [-1, 1]) {
        ellipsoid(
            'Ear',
            skin,
            side * 0.263,
            0.47,
            0,
            0.065,
            0.105,
            0.055
        );

        ellipsoid(
            'EarDetail',
            skinLight,
            side * 0.291,
            0.47,
            0.035,
            0.025,
            0.06,
            0.025
        );
    }

    // EYES
    for (const side of [-1, 1]) {
        const x = side * 0.105;

        ellipsoid(
            'EyeSocket',
            skinLight,
            x,
            0.535,
            0.193,
            0.075,
            0.047,
            0.035
        );

        ellipsoid(
            'EyeWhite',
            white,
            x,
            0.535,
            0.218,
            0.052,
            0.027,
            0.019
        );

        ellipsoid(
            'Iris',
            iris,
            x,
            0.535,
            0.237,
            0.022,
            0.023,
            0.012
        );

        ellipsoid(
            'Pupil',
            pupil,
            x,
            0.535,
            0.246,
            0.011,
            0.015,
            0.008
        );

        ellipsoid(
            'EyeHighlight',
            white,
            x - 0.006,
            0.543,
            0.253,
            0.005,
            0.006,
            0.004
        );

        // EYEBROWS
        tube(
            'Eyebrow',
            [
                new THREE.Vector3(x - 0.06, 0.595, 0.205),
                new THREE.Vector3(x, 0.615, 0.22),
                new THREE.Vector3(x + 0.06, 0.595, 0.205)
            ],
            0.012,
            eyebrow
        );
    }

    // NOSE BRIDGE
    ellipsoid(
        'NoseBridge',
        skinLight,
        0, 0.47, 0.22,
        0.045, 0.105, 0.055
    );

    // NOSE TIP
    ellipsoid(
        'NoseTip',
        skin,
        0, 0.405, 0.265,
        0.052, 0.04, 0.045
    );

    // NOSTRILS
    for (const side of [-1, 1]) {
        ellipsoid(
            'Nostril',
            hairDark,
            side * 0.027,
            0.389,
            0.291,
            0.012,
            0.008,
            0.007
        );
    }

    // MOUTH
    tube(
        'UpperLip',
        [
            new THREE.Vector3(-0.065, 0.315, 0.209),
            new THREE.Vector3(-0.025, 0.325, 0.224),
            new THREE.Vector3(0, 0.319, 0.228),
            new THREE.Vector3(0.025, 0.325, 0.224),
            new THREE.Vector3(0.065, 0.315, 0.209)
        ],
        0.009,
        hairDark
    );

    tube(
        'LowerLip',
        [
            new THREE.Vector3(-0.05, 0.306, 0.216),
            new THREE.Vector3(0, 0.294, 0.228),
            new THREE.Vector3(0.05, 0.306, 0.216)
        ],
        0.009,
        skinLight
    );

    // HAIR BACK
    ellipsoid(
        'HairBack',
        hair,
        0, 0.57, -0.105,
        0.275, 0.29, 0.19
    );

    // HAIR TOP
    ellipsoid(
        'HairTop',
        hair,
        0, 0.735, -0.015,
        0.265, 0.115, 0.23
    );

    // SIDE HAIR
    for (const side of [-1, 1]) {
        ellipsoid(
            'SideHair',
            hair,
            side * 0.22,
            0.66,
            0,
            0.065,
            0.14,
            0.19
        );
    }

    // PINK BASEBALL CAP
    const cap = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.285,
            40,
            24,
            0,
            Math.PI * 2,
            0,
            Math.PI / 2
        ),
        pink
    );

    cap.name = 'PinkCap';
    cap.position.set(0, 0.79, 0);
    cap.scale.set(1, 0.55, 1);
    cap.castShadow = true;
    head.add(cap);

    // CAP BRIM
    const brim = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 16),
        pink
    );

    brim.name = 'CapBrim';
    brim.position.set(0, 0.735, 0.18);
    brim.scale.set(0.23, 0.025, 0.19);
    brim.castShadow = true;
    head.add(brim);

    // CAP BUTTON
    ellipsoid(
        'CapButton',
        pink,
        0, 0.95, 0,
        0.025, 0.015, 0.025
    );

    // FINAL POSITION
    head.name = 'MaleCharacterHead';
    head.position.set(0, 0, 0);

    return head;
}
