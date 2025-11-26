const API_URL = 'http://localhost:3000/api';

async function testAuth() {
    try {
        console.log('--- Testing Authentication ---');

        // 1. Register
        console.log('\n1. Registering new user...');
        const uniqueEmail = `test${Date.now()}@example.com`;
        let token = '';

        try {
            const registerRes = await fetch(`${API_URL}/usuarios/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: 'Test User',
                    email: uniqueEmail,
                    password: 'password123',
                    rol: 'admin'
                })
            });
            const registerData = await registerRes.json();
            if (registerRes.ok) {
                console.log('✅ Register success:', registerData);
            } else {
                console.error('❌ Register failed:', registerData);
            }
        } catch (error) {
            console.error('❌ Register error:', error.message);
        }

        // 2. Login
        console.log('\n2. Logging in...');
        try {
            const loginRes = await fetch(`${API_URL}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: uniqueEmail,
                    password: 'password123'
                })
            });
            const loginData = await loginRes.json();
            if (loginRes.ok) {
                console.log('✅ Login success:', loginData);
                token = loginData.token;
            } else {
                console.error('❌ Login failed:', loginData);
                return;
            }
        } catch (error) {
            console.error('❌ Login error:', error.message);
            return;
        }

        // 3. Access Protected Route WITHOUT Token
        console.log('\n3. Accessing protected route WITHOUT token...');
        try {
            const protectedRes = await fetch(`${API_URL}/productos`);
            if (protectedRes.status === 401 || protectedRes.status === 403) {
                console.log('✅ Access denied as expected:', protectedRes.status);
            } else {
                console.error('❌ Failed: Should have been denied access. Status:', protectedRes.status);
            }
        } catch (error) {
            console.error('❌ Unexpected error:', error.message);
        }

        // 4. Access Protected Route WITH Token
        console.log('\n4. Accessing protected route WITH token...');
        try {
            const protectedRes = await fetch(`${API_URL}/productos`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (protectedRes.ok) {
                console.log('✅ Access success:', protectedRes.status);
            } else {
                const data = await protectedRes.json(); // Try to get error message
                console.error('❌ Access failed:', protectedRes.status, data);
            }
        } catch (error) {
            console.error('❌ Access error:', error.message);
        }

    } catch (error) {
        console.error('Unexpected error:', error);
    }
}

testAuth();
