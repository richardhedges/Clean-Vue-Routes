<script>
export default {
    beforeRouteEnter(to, from, next) {

        if (!loggedIn) { // any conditions you feel like...
            return next('login')
        }

        next()

    }
}
</script>