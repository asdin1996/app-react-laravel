import React from "react";
import {withTranslation} from "react-i18next";

/**
 * Footer Component
 *
 * This component renders the application's footer.
 * It contains copyright information.
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 */
class Footer extends React.Component {
    /**
     * Renders the Footer component
     * @returns {JSX.Element}
     */
    render() {
        const { t } = this.props;
        return (
            <footer>
                <p>{t('footer.copyright')}</p>
            </footer>
        );
    }
}

export default withTranslation()(Footer);
