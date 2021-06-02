<template>
    <div>
        <h1>Dashboard</h1>
        <hr>
        <ul>
            <li><router-link :to="{ name: 'users' }">All Users</router-link></li>
            <li><router-link :to="{ name: 'users.new' }">New User</router-link></li>
        </ul>
    </div>
</template>