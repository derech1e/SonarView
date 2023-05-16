import styles from "./styles.module.css";

export default function TermsOfServicePage() {
    return (
        <div className={"flex justify-center overflow-y-scroll"}>
            <article className={styles.article}>
                <h1 className={styles.h1}>Nuerk-Solutions Terms of Service Agreement</h1>
                <p className={styles.p}>TERMS OF SERVICE AGREEMENT</p>
                <p className={styles.p}>This Terms of Service Agreement ("Agreement") is entered into between
                    Nuerk-Solutions ("Nuerk-Solutions"), a
                    company incorporated under the laws of the state of Delaware, and the user ("User") who intends to
                    use the services offered by Nuerk-Solutions. By accessing or using Nuerk-Solutions' services, User
                    acknowledges
                    that they have read, understood, and agree to be bound by the terms and conditions of this
                    Agreement. If User does not agree to these terms, User may not use the services offered by
                    Nuerk-Solutions.</p>
                <ol className={styles.ol}>
                    <li>Definitions
                        <ol>
                            <li>"Services" refers to the file hosting and sharing services offered by Nuerk-Solutions
                                through
                                Amazon Web Services.
                            </li>
                            <li>"User Content" refers to any files, data, information, or other content uploaded or
                                transmitted by User through the Services.
                            </li>
                        </ol>
                    </li>
                    <li>Use of Services
                        <ol>
                            <li>User agrees to use the Services solely for lawful purposes and in compliance with all
                                applicable laws and regulations.
                            </li>
                            <li>User agrees not to upload or transmit any User Content that is infringing, libelous,
                                defamatory, obscene, pornographic, abusive, or otherwise offensive.
                            </li>
                            <li>User agrees not to use the Services in a manner that would violate the intellectual
                                property rights of any third party.
                            </li>
                            <li>User acknowledges and agrees that Nuerk-Solutions has no control over the content of
                                User
                                Content and does not endorse, support, or guarantee the accuracy, completeness, or
                                reliability of User Content.
                            </li>
                        </ol>
                    </li>
                    <li>User Data Ownership
                        <ol>
                            <li>User retains all ownership rights in any data, files, or other content ("User Content")
                                uploaded or stored on the Services.
                            </li>
                            <li>Nuerk-Solutions does not own or claim any rights to User Content and will not use,
                                modify, or
                                disclose User Content except as necessary to provide the Services or as required by law.
                            </li>
                            <li>User is solely responsible for ensuring that User Content does not infringe any
                                third-party intellectual property rights or violate any applicable laws or regulations.
                            </li>
                        </ol>
                    </li>
                    <li>Fees and Payment
                        <ol>
                            <li>Nuerk-Solutions reserves the right to charge fees for the use of its Services.</li>
                            <li>User agrees to pay all fees and charges incurred in connection with the use of the
                                Services in a timely manner.
                            </li>
                            <li>Nuerk-Solutions reserves the right to modify its fees and payment policies at any time,
                                with
                                notice to User.
                            </li>
                        </ol>
                    </li>
                    <li>Disclaimer of Warranties
                        <ol>
                            <li>Nuerk-Solutions provides its Services on an "as is" and "as available" basis.</li>
                            <li>Nuerk-Solutions does not warrant that the Services will meet User's requirements, be
                                error-free, uninterrupted, or secure.
                            </li>
                            <li>Nuerk-Solutions disclaims all warranties, whether express or implied, including but not
                                limited
                                to, warranties of merchantability, fitness for a particular purpose, and
                                non-infringement.
                            </li>
                        </ol>
                    </li>
                    <li>Limitation of Liability
                        <ol>
                            <li>Nuerk-Solutions shall not be liable for any damages arising from the use of, inability
                                to use,
                                or reliance on the Services, including but not limited to, direct, indirect, incidental,
                                special, or consequential damages.
                            </li>
                            <li>Nuerk-Solutions' liability for any claim arising out of or relating to this Agreement
                                shall not
                                exceed the amount paid by User to Nuerk-Solutions for the Services.
                            </li>
                            <li>Nuerk-Solutions shall not be liable for any damages arising from the unauthorized access
                                to or
                                use of User Content.
                            </li>
                        </ol>
                    </li>
                    <li>Indemnification
                        <ol>
                            <li>User agrees to indemnify, defend, and hold harmless Nuerk-Solutions and its officers.
                            </li>
                            <li>User agrees to indemnify, defend, and hold harmless Nuerk-Solutions and its officers,
                                directors, employees, agents, and affiliates from and against any and all claims,
                                damages, liabilities, costs, and expenses, including reasonable attorneys' fees, arising
                                from or related to User's use of the Services, User Content, or User's breach of this
                                Agreement.
                            </li>
                        </ol>
                    </li>
                    <li>Termination
                        <ol>
                            <li>Nuerk-Solutions may terminate this Agreement and User's access to the Services at any
                                time,
                                with or without cause, by providing notice to User.
                            </li>
                            <li>Upon termination, User's access to the Services will be immediately terminated and all
                                User Content will be deleted.
                            </li>
                            <li>The provisions of Sections 3, 5, 6, 7, and 9 of this Agreement shall survive any
                                termination.
                            </li>
                        </ol>
                    </li>
                    <li>Governing Law and Jurisdiction
                        <ol>
                            <li>This Agreement shall be governed by and construed in accordance with the laws of the
                                state of Delaware, without giving effect to any choice of law or conflict of law
                                provisions.
                            </li>
                            <li>Any dispute arisin g out of or relating to this Agreement shall be resolved exclusively
                                in the state and federal courts located in Delaware.
                            </li>
                        </ol>
                    </li>
                    <li>Miscellaneous
                        <ol>
                            <li>This Agreement constitutes the entire agreement between Nuerk-Solutions and User
                                regarding the
                                Services and supersedes all prior agreements and understandings, whether written or
                                oral.
                            </li>
                            <li>Nuerk-Solutions may assign this Agreement or any of its rights or obligations hereunder
                                without
                                User's prior consent.
                            </li>
                            <li>User may not assign this Agreement or any of its rights or obligations hereunder without
                                the prior written consent of Nuerk-Solutions.
                            </li>
                            <li>The failure of either party to enforce any provision of this Agreement shall not be
                                deemed a waiver of such provision or the right to enforce such provision.
                            </li>
                            <li>If any provision of this Agreement is held to be invalid or unenforceable, the remaining
                                provisions shall remain in full force and effect.
                            </li>
                        </ol>
                    </li>
                </ol>
                <p className={styles.p}>By using the Services, User agrees to be bound by the terms and conditions of
                    this Agreement. If User
                    does not agree to these terms, User may not use the Services offered by Nuerk-Solutions.</p>
            </article>
        </div>
    );
}