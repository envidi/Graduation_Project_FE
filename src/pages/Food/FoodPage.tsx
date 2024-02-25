import { Navbar } from '../../components/Navbar'
import { Footer } from '../../components/Footer'
import { AnimatedPage } from '../../components/AnimatedPage'

const FoodPage = ({
    handleSignState,
    handleLoginState,
    signedPerson,
    handlelogout,
    setMenuState
}) => {
    return (
        <AnimatedPage>
            <>
                <Navbar
                    signedPerson={signedPerson}
                    pageName="food"
                    handleSignState={handleSignState}
                    handleLoginState={handleLoginState}
                    handlelogout={handlelogout}
                    setMenuState={setMenuState}
                />


                <Footer
                    handleSignState={handleSignState}
                    handleLoginState={handleLoginState}
                />
            </>
        </AnimatedPage>
    )
}

export default FoodPage
